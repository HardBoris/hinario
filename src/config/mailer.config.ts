import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "brahmanbreederbg@gmail.com",
    pass: "wkotvvayptglsppw",
  },
});

transporter.verify().then(() => {
  console.log("Ready por send emails");
});

export default transporter;
