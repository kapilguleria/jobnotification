const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.SMPT_EMAIL,
        pass: process.env.SMPT_PASSWORD,
    },
});

const sendEmail = async (to, subject, html) => {
    await transporter.sendMail({
        from: process.env.SMPT_EMAIL,
        to: to,
        subject: subject,
        html: html,
    });
    return;
}


module.exports = sendEmail