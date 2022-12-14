import nodemailer from "nodemailer";
import * as dotenv from "dotenv";
dotenv.config();

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.OWNER_EMAIL,
    pass: process.env.MASTER_PASSWORD,
  },
});

export default transport;
