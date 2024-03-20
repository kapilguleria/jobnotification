const mongoose = require('mongoose');
const { Schema } = mongoose;


const userSchema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isActive: {type: Boolean, default: false, required: true},
    name: {type: String},
    DOB: {type: String},
    organisation_id: [{type: mongoose.Schema.Types.ObjectId, ref: "Organisation", required: true}]
},{timestamps: true});

const User = mongoose.model('User', userSchema);
module.exports = User