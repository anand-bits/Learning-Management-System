import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const sendMail = async function (email, subject, message) {
  let transporter = nodemailer.createTransport({
    host: "smtp.forwardemail.net",
    port: 465,
    secure: true, // Set to true for secure connection
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    // Sending email
    const info = await transporter.sendMail({
      from: 'AnandTiwari@gmail.com',
      to: email,
      subject: subject,
      text: message,
      html: `<b>${message}</b>`,
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
};

export default sendMail;
