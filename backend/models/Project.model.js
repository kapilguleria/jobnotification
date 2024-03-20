const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProjectSchema = new Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    organisation_id: {type: mongoose.Schema.Types.ObjectId, ref: "Organisation", required: true},
    name: {type: String, required: true},
    color: {type: String},
    description: {type: String},
    isBillable: {type: Boolean, required: true, default: false}
}, { timestamps: true });

const Project = mongoose.model('Project', ProjectSchema);
module.exports = Project