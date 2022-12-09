import transport from "../config/mailer.config";

class mailerService {
  welcomeEmail = () => {
    const mailOptions = {
      from: "bgaibor03@gmail.com",
      to: "borisggl@hotmail.com",
      subject: "Prueba",
      text: "este email fue enviado porque usted creo un nuevo usuario",
    };
    transport.sendMail(mailOptions, (error) => {
      console.log(error);
    });
  };
}

export default new mailerService();
