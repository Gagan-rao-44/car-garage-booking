import nodemailer from "nodemailer";

const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: subject,
      text: text
    };

    await transporter.sendMail(mailOptions);

console.log("EMAIL SENT TO:", to);

  } catch (error) {
    console.log("EMAIL ERROR:", error);

  }
};

export default sendEmail;