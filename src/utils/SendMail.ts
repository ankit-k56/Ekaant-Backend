import nodemailer from "nodemailer";
import "dotenv/config";
const sendMail = (token: string, userEmail: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: "ankitkumar19041@gmail.com",
    to: userEmail,
    subject: "Email Verification",
    html: `<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
    <h1 style="text-align: center; color: #1a1a1a;">Verify Your Email</h1>
    <p style="text-align: center; color: #1a1a1a;">Hi </p>
    <p style="text-align: center; color: #1a1a1a;">Thanks for Signing up for Ekaant. Please verify your email by clicking the button below.</p>
    <div style="text-align: center;">
      <a href="http://localhost:8080/auth/verify-email/${token}" style="background-color: #1a1a1a; color: #fff; padding: 10px 20px; border-radius: 5px; text-decoration: none;">Verify Email</a>
    </div>
    <p style="text-align: center; color: #1a1a1a;">Regards,<br />Ekaant Ai</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error occurred:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};
export default sendMail;
