import transporter from "../config/mailer.config";

class mailerService {
  welcomeEmail = () => {
    const mailOptions = {
      from: "'Meu Hinario' <brahmanbreederbg@gmail.com>",
      to: "borisggl@hotmail.com",
      subject: "Prueba",
      text: "este email fue enviado porque usted creo un nuevo usuario",
    };
    transporter.sendMail(mailOptions, (error) => {
      console.log(error);
    });
  };
}

export default new mailerService();
