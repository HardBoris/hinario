import transporter from "../config/mailer.config";

class mailerService {
  welcomeEmail = (userEmail: string) => {
    const mailOptions = {
      from: "'Meu Hinario' <brahmanbreederbg@gmail.com>",
      to: "borisggl@hotmail.com",
      subject: "Nuevo Usuario Cadastrado",
      text: `este email foi enviado porque ${userEmail} acabou de criar um novo usuário`,
    };
    transporter.sendMail(mailOptions, (error) => {
      console.log(error);
    });
  };
}

export default new mailerService();
