const mongoose = require('mongoose');
const { Schema } = mongoose;

const RSSFeedSchema = new Schema({
    sales_id: {type: mongoose.Schema.Types.ObjectId, ref: "Sales", required: true},
    title: {type: String},
    link: {type: String, unique: true},
    pubDate: {type: String},
    content: {type: String}
}, { timestamps: true });

const RSSFeed = mongoose.model('RSSFeed', RSSFeedSchema);
module.exports = RSSFeed