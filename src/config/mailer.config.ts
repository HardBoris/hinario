import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "3b6033c44c2348",
    pass: "b5d12801f8d363",
  },
});

export default transport;
