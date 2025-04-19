import nodemailer from "nodemailer";

const sendEmail = async (option) => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // 2) Define the Email option
  const mailOption = {
    from: "Humayun Ahmed <humayunahmed82@gmail.com>",
    to: option.email,
    subject: option.subject,
    text: option.message,
    // html:
  };

  // 3) Actually Email option
  await transporter.sendMail(mailOption);
};

export default sendEmail;
