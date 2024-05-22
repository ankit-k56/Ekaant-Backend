import nodemailer from "nodemailer";
import "dotenv/config";

import sgMail, { MailDataRequired } from "@sendgrid/mail";

const apiKey = process.env.SENDGRID_API_KEY as string;
sgMail.setApiKey(apiKey);

export const sendMail = async (
  token: string,
  userEmail: string
): Promise<{
  success: boolean;
  message: string;
}> => {
  // const sgMail = require("@sendgrid/mail");

  const emailData: MailDataRequired = {
    to: userEmail,
    from: process.env.EMAIL_FROM as string,
    subject: "Email verification",
    html: `<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
    <h1 style="text-align: center; color: #1a1a1a;">Verify Your Email</h1>
    <p style="text-align: center; color: #1a1a1a;">Hi </p>
    <p style="text-align: center; color: #1a1a1a;">Thanks for Signing up for Ekaant. Please verify your email by clicking the button below.</p>
    <div style="text-align: center;">
      <a href="https://ekaant.azurewebsites.net/auth/verify-email/${token}" style="background-color: #1a1a1a; color: #fff; padding: 10px 20px; border-radius: 5px; text-decoration: none;">Verify Email</a>
    </div>
    <p style="text-align: center; color: #1a1a1a;">Regards,<br />Ekaant Ai</p>`,
  };

  try {
    const response = await sgMail.send(emailData);
    console.log("Email sent successfully to :", userEmail);
    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: "Error sending email" };
  }
};
