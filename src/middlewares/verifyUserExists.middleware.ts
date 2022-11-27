import { NextFunction, Request, Response } from "express";
import { User } from "../entities/User";
import { userRepository } from "../repositories";

const verifyUserExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const foundUser: User = await userRepository.findOne({
    email: req.validated.email,
  });

  if (foundUser) {
    // return res.status(409).json({ message: "Email already exists" });
    return res.status(409).json({
      error: {
        message: "Email already exists",
        name: "InvalidEmail",
      },
    });
  }

  return next();
};

export default verifyUserExists;
