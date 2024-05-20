import nodemailer from "nodemailer";
import "dotenv/config";
const sendMail = (token, userEmail) => {
    const transporter = nodemailer.createTransport({
        host: "smtpout.secureserver.net",
        secure: true,
        tls: {
            ciphers: "SSLv3",
        },
        requireTLS: true,
        port: 465,
        debug: true,
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASS,
        },
    });
    const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: userEmail,
        subject: "Email Verification",
        html: `<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
    <h1 style="text-align: center; color: #1a1a1a;">Verify Your Email</h1>
    <p style="text-align: center; color: #1a1a1a;">Hi </p>
    <p style="text-align: center; color: #1a1a1a;">Thanks for Signing up for Ekaant. Please verify your email by clicking the button below.</p>
    <div style="text-align: center;">
      <a href="https://ekaant.azurewebsites.net/auth/verify-email/${token}" style="background-color: #1a1a1a; color: #fff; padding: 10px 20px; border-radius: 5px; text-decoration: none;">Verify Email</a>
    </div>
    <p style="text-align: center; color: #1a1a1a;">Regards,<br />Ekaant Ai</p>`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error occurred:", error);
        }
        else {
            console.log("Email sent:", info.response);
        }
    });
};
export default sendMail;
