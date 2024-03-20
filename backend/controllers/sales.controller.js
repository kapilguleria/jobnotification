const Sales = require("../models/Sales.model")
const User = require("../models/User.models")
const RSSFeed = require("../models/RSSFeed.model")
let Parser = require('rss-parser');
const OpenAI = require("openai")
let parser = new Parser({
    maxRedirects: 1000
});

let openAIKey = process.env.AI_API_KEY
const openai = new OpenAI({ apiKey: openAIKey });

const getParsedData = async (req, res) => {
    const RSSName = req.query.name

    try {
        const getRSSValue = await Sales?.findOne({
            name: RSSName
        })

        if (!getRSSValue) {
            throw new Error("Provided Name for RSS is wrong!")
        }

        let feed = await parser.parseURL(getRSSValue?.RSS);

        let newData = [];

        console.log('feed?.data', feed?.items)

        for (let item of feed?.items) {
            const checkFeed = await RSSFeed.findOne({
                link: item?.link
            })

            if (!checkFeed) {
                newData?.push({
                    sales_id: getRSSValue?._id,
                    title: item?.title,
                    link: item?.link,
                    pubDate: item?.pubDate,
                    content: item?.content
                })
            }
        }

        await RSSFeed.create(newData)

        const getRssFeedData = await RSSFeed.find({
            sales_id: getRSSValue?._id
        })

        return res.status(200).json({
            data: getRssFeedData
        })
    } catch (err) {
        return res.status(500).json({
            status: 500,
            message: err.message
        })
    }
}

const getFeedUpdates = async (req, res) => {

    try {

    const getSales = await Sales.find();

    let count = 0;

    let countData = []

    for (let item of getSales) {
        console.log('item?.name', item?.name)
        const getFeed = await parser.parseURL(item?.RSS);

        for (let items of getFeed?.items) {
            const checkFeed = await RSSFeed.findOne({
                link: items?.link
            })

            if (!checkFeed) {
                count += 1;
            }
        }
        countData?.push({
            name: item?.name,
            count: count
        })
        count = 0;
    }
    return res.status(200).json({
        data: countData
    })
}catch (err) {
    return res.status(500).json({
        status: 500,
        message: err.message
    })
}

}

const addSalesRSS = async (req, res) => {
    const { name, RSS, user_id } = req.body;

    try {
        const checkForUser = await User.findById(user_id);

        if (!checkForUser) {
            throw new Error("User doesn't exist");
        }

        const addRSS = new Sales({
            user_id: user_id,
            name: name,
            RSS: RSS
        })

        await addRSS.save()

        return res.status(200).json({
            message: "RSS Added successfully",
        })

    } catch (err) {
        return res.status(500).json({
            status: 500,
            message: err.message
        })
    }

}

const getSalesRSSTitles = async (req, res) => {
    try {
        const getRSSTitle = await Sales.find()

        return res.status(200).json({
            status: 200,
            data: getRSSTitle,
        })

    } catch (err) {
        return res.status(500).json({
            status: 500,
            message: err.message
        })
    }
}

const getProjectUnderstanding = async (req, res) => {
    const { content } = req.body;

    const prompt = `Consider yourself as a best business developer, and I am a business manager to you. Client has shared me the project description, and I have to provide him the understanding of the project. Please consider the data bettween " " as a project data shared by the client, and share me the project understanding. "${content}" `

    const completion = await openai.chat.completions.create({
        messages: [{ "role": "system", "content": "You are a helpful assistant." },
        { "role": "user", "content": prompt }],
        model: "gpt-3.5-turbo",
    });

    return res.status(200).json({
        status: 200,
        data: completion.choices[0]
    })

    // return true;

}

module.exports = { getParsedData, getProjectUnderstanding, addSalesRSS, getSalesRSSTitles, getFeedUpdates }