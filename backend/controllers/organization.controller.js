const Organisation = require("../models/Organisation.model")
const User = require("../models/User.models")

const createOrganisation = async (req, res) => {
    const { email, name } = req.body;

    try {
        const checkForUser = await User.findOne({
            email: email
        })

        if (!checkForUser) {
            throw new Error("User doesn't exist")
        }

        const createOrg = new Organisation({
            organisation_name: name
        })

        let total_organization = checkForUser?.organisation_id

        total_organization?.push(createOrg?._id)

        await User.findOneAndUpdate({ email: email }, { organisation_id: total_organization })

        await createOrg.save();

        return res.status(200).json({
            message: "organization creation successfully."
        })

    }
    catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

const getOrg = async (req, res) => {
    const id = req.params.id;
    
    try {
        const user = await User.findById(id).populate('organisation_id');

        if(!user) {
            throw new Error("User doesn't exist")
        }

        return res.status(200).json({
            data: user?.organisation_id
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }

}




module.exports = { createOrganisation, getOrg }