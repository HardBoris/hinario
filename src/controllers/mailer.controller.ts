import { Request, Response } from "express";
import hbs from "nodemailer-express-handlebars";
import path from "path";
import transporter from "../config/mailer.config";

const sendEmail = (req: Request, res: Response) => {
  const handlebarOptions = {
    viewEngine: {
      partialsDir: path.resolve("./src/views"),
      defaultLayout: false,
    },
    viewPath: path.resolve("./src/views"),
  };

  transporter.use("compile", hbs(handlebarOptions));

  const mailOptions = {
    from: "'Meu Hinario' <brahmanbreederbg@gmail.com>",
    to: "borisggl@hotmail.com",
    cc: "",
    bcc: "",
    subject: "Nuevo Usuario Cadastrado",
    template: "email",
    context: {
      name: "Aluno",
      company: "Meu Hinario",
    },
    attachments: [
      {
        filename: "file",
        path: "./src/views/attachments/file",
      },
    ],
  };
};

export default sendEmail;
