import nodemailer from 'nodemailer';

const sendMail = async function (email, subject, message) {
  let transporter = nodemailer.createTransport({
    host: "smtp.forwardemail.net",
    port: 465,
    secure: true, // Set to true for secure connection
    auth: {
      user: "anandtiwari840972@gmail.com",
      pass: "Anand@1999",
    },
  });

  try {
    // Sending email
    const info = await transporter.sendMail({
      from: 'AnandTiwari@gmail.com',
      to: email,
      subject: subject, // Use the provided subject
      text: message, // Use the provided message
      html: `<b>${message}</b>`, // Use the provided message in HTML format
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
};

export default sendMail;
