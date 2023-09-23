const nodemailer = require('nodemailer');

const sendEmail = async function(options){
    const transporter = nodemailer.createTransport({
        //service: "Gmail",
        host: process.env.EMAIL_HOST,
        port:process.env.EMAIL_PORT,
        secure: false,
        logger: true,
        auth:{
            user:process.env.EMAIL_USERNAME,
            pass:process.env.EMAIL_PASSWORD,
        }

    })

    const mailOptions={
        from: "Radko Černohous <radko.cernohous.jr@seznam.cz>",
        to: options.email,
        subject: options.subject,
        text: options.message,
    }

    await transporter.sendMail(mailOptions)
}

module.exports=sendEmail;