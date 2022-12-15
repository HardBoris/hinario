import { Request, Response } from "express";
// import transport from "../services/mailer.service";

const sendEmail = (req: Request, res: Response) => {
  console.log(req);
  const mailOptions = {
    from: "",
    to: "coxivec594@areosur.com",
    subject: "Texto de prueba",
    text: "envio de prueba",
  };

  /* transport.sendMail(mailOptions, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.json({ message: "email enviado!" });
    }
  }); */
};

export default sendEmail;
