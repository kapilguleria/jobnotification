const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrganisationSchema = new Schema({
    organisation_name: {type: String, required: true}
}, { timestamps: true });

const Organisation = mongoose.model('Organisation', OrganisationSchema);
module.exports = Organisation