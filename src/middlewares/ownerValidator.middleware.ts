import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { User } from "../entities";
import { userRepository } from "../repositories";

const ownerValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const decodedUser: User = await userRepository.findOne({
    userId: req.decoded.userId,
  });

  if (decodedUser.userCategory === "owner") {
    return next();
  }

  if (decodedUser.userCategory !== "owner") {
    return res
      .status(401)
      .json({ message: "You are not authorized to perform this operation." });
  }
};

export default ownerValidator;
