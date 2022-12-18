import { NextFunction, Request, Response } from "express";
import { User } from "../entities/User";
import { userRepository } from "../repositories";

const verifyUserNotExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const searchUser: User = await userRepository.findOne({
    email: req.validated.email,
  });

  if (!searchUser) {
    return res.status(404).json({
      error: {
        message: "Email not exists",
        name: "EmailNotFound",
      },
    });
  }

  return next();
};

export default verifyUserNotExists;
