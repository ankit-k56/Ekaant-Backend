var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
import "dotenv/config";
import sgMail from "@sendgrid/mail";
const apiKey = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(apiKey);
export const sendMail = (token, userEmail) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // const sgMail = require("@sendgrid/mail");
    const emailData = {
      to: userEmail,
      from: process.env.EMAIL_FROM,
      subject: "Email verification",
      html: `<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
    <h1 style="text-align: center; color: #1a1a1a;">Verify Your Email</h1>
    <p style="text-align: center; color: #1a1a1a;">Hi </p>
    <p style="text-align: center; color: #1a1a1a;">Thanks for Signing up for Ekaant. Please verify your email by clicking the button below.</p>
    <div style="text-align: center;">
      <a href="https://ekaant-backend.azurewebsites.net/auth/verify-email/${token}" style="background-color: #1a1a1a; color: #fff; padding: 10px 20px; border-radius: 5px; text-decoration: none;">Verify Email</a>
    </div>
    <p style="text-align: center; color: #1a1a1a;">Regards,<br />Ekaant Ai</p>`,
    };
    try {
      const response = yield sgMail.send(emailData);
      console.log("Email sent successfully to :", userEmail);
      return { success: true, message: "Email sent successfully" };
    } catch (error) {
      console.error("Error sending email:", error);
      return { success: false, message: "Error sending email" };
    }
  });
