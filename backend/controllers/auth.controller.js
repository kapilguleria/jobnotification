const User = require('../models/User.models')
const OtpMech = require("../models/OtpMech.models")
const bcrypt = require("bcrypt");
const sendEmail = require('../utils/sendEmail');
const { v4: uuidv4 } = require('uuid');
const generateAccessToken = require('../utils/createToken');


const registerUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const checkForUser = await User.findOne({
            email: email
        });

        if (checkForUser) {
            throw new Error("User Already Exists")
        }

        const encryptPassword = bcrypt.hashSync(password, 10);

        const createNewUser = new User({
            email: email,
            password: encryptPassword
        })

        let otp = uuidv4();

        const addOTP = new OtpMech({
            user_id: createNewUser?._id,
            otp: otp,
        })

        let html = `
        <h1>${otp}</h1>
        `
        await sendEmail(email, "Verify OTP", html);

        await createNewUser.save();
        await addOTP?.save();

        return res.status(200).json({
            message: "User added successfully"
        })
    }
    catch (err) {
        return res.status(500).json({
            message: err?.message
        })
    }

}

const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const checkForUser = await User.findOne({
            email: email,
        })

        if (!checkForUser) {
            throw new Error("User doesn't exist, please register")
        }

        const checkForOtp = await OtpMech.findOne({
            user_id: checkForUser?._id,
            otp: otp
        })

        if (!checkForOtp) {
            throw new Error("OTP doesn't match")
        }

        await OtpMech.findOneAndUpdate({
            user_id: checkForUser?._id
        }, {
            isApplied: true
        })

        await User.findOneAndUpdate({
            email: email
        }, {
            isActive: true
        })

        return res.status(200).json({
            message: "OTP verified successfully"
        })
    }
    catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }

}

const resendOtp = async (req, res) => {
    const { email } = req.body;

    try {
        const checkForUser = await User.findOne({
            email: email
        })

        if (!checkForUser) {
            throw new Error("User doesn't exist")
        }

        let otp = uuidv4();

        let html = `
        <h1>${otp}</h1>
        `
        await sendEmail(email, "Verify OTP", html);

        await OtpMech.findOneAndUpdate({
            user_id: checkForUser?.id,
        }, {
            otp: otp
        })

        return res.status(200).json({
            message: "OTP resent Successfully"
        })

    }
    catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }


}

const signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const checkForUser = await User.findOne({ email: email });

        if (!checkForUser) {
            throw new Error("User doesn't exist. Please register");
        }

        const checkForPassword = bcrypt.compareSync(password, checkForUser?.password);

        if (!checkForPassword) {
            throw new Error("Password is wrong")
        }

        const getToken = generateAccessToken(email);


        return res.status(200).json({
            data: checkForUser,
            token: getToken,
            message: "User signed in successfully"
        })
    }
    catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

module.exports = { registerUser, verifyOtp, resendOtp, signIn }