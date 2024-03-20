const mongoose = require('mongoose');
const { Schema } = mongoose;

const SalesSchema = new Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    name: {type: String, required: true, unique: true}, 
    RSS: {type: String, required: true},
}, { timestamps: true });

const Sales = mongoose.model('Sales', SalesSchema);
module.exports = Sales