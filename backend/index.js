require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const apiRouter = require("./routes/index")
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./docs/swagger.yaml');
const app = express()
const http = require('http').Server(app);
let Parser = require('rss-parser');
let parser = new Parser();


const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});

const port = process.env.PORT
const db = process.env.DB;

socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);
    socket.on('disconnect', () => {
      console.log('🔥: A user disconnected');
    });
});

app.use(express.json())
app.use(cors())
app.use("/", apiRouter)

const handleRSSUpdate = (updatedData) =>  {
    socketIO.emit('rss_update', updatedData);
}

const getParsedData = async () => {
    let feed = await parser.parseURL('https://www.upwork.com/ab/feed/jobs/rss?q=react.js&sort=recency&paging=0%3B10&api_params=1&securityToken=7a1c96075fb2245bfd45868a7341e416f3bdac36871da705b86a26410f4f89df775f5e391ee14403b3552da1d5032f129d751fda3af10f576885dc78422b86df&userUid=1658447370950938624&orgUid=1658447370950938625');

    handleRSSUpdate(feed);
}

setInterval(getParsedData, 10000); 


app.use('/api-docs', swaggerUi.serve,
    swaggerUi.setup(swaggerDocument));


http.listen(port, () => {
    mongoose.connect(db).then(() => {
        console.log(`Example app listening on port ${port}`)
    })
})