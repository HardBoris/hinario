import hbs from "nodemailer-express-handlebars";
import path from "path";
import transporter from "../config/mailer.config";

class mailerService {
  welcomeEmail = (userEmail: string) => {
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
        name: userEmail,
        company: "Meu Hinario",
      },
      /* attachments: [
        {
          filename: "wingbg.png",
          path: "./src/views/attachments/wingbg.png",
        },
      ], */
    };
    transporter.sendMail(mailOptions);
  };
}

export default new mailerService();
