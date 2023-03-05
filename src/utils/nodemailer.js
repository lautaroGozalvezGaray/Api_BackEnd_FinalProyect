const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'lucius.quitzon@ethereal.email',
        pass: 'H1n4Ku411zHBgX2tA6'
    }
});

sendEmail = async (data) => {
    const content = JSON.stringify(data)
    const mailOptions = {
        from: 'Ecommerce NodeJS',
        to: process.env.NODEMAILER_EMAIL_TO,
        subject: "Orden de compra generada",
        html: `<h2>Datos recibidos:</h2><pre>${content}</pre>`
    }

    try {
        const info = await transporter.sendMail(mailOptions)
        console.log(info)
    } catch (err) {
        console.log(err)
    }
}

module.exports = {sendEmail};