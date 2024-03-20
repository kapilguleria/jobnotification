const mongoose = require('mongoose');
const { Schema } = mongoose;

const OtpMechSchema = new Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    otp: { type: String, required: true },
    isApplied: { type: Boolean, required: true, default: false }
}, { timestamps: true });

const OtpMech = mongoose.model('OtpMech', OtpMechSchema);
module.exports = OtpMech