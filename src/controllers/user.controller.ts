import { Request, Response } from "express";
import { mailerService, userService } from "../services";

class UserController {
  loaderUser = async (req: Request, res: Response) => {
    const { status, users } = await userService.loaderUser(req);
    return res.status(status).json(users);
  };

  loginUser = async (req: Request, res: Response) => {
    const { status, message } = await userService.loginUser(req);
    return res.status(status).json(message);
  };

  createUser = async (req: Request, res: Response) => {
    const user = await userService.createUser(req);
    mailerService.welcomeEmail(user.email);
    return res.status(201).json(user);
  };

  /* sendEmail = () => {
    // const user = await userService.createUser(req);
    const envio = mailerService.welcomeEmail();
    return envio;
  }; */

  updateUser = async (req: Request, res: Response) => {
    const user = await userService.updateUser(req);
    return res.status(201).json(user);
  };
}

export default new UserController();
