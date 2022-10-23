import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { User } from "../entities";
import { userRepository } from "../repositories";

const categoryValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const decodedUser: User = await userRepository.findOne({
    userId: req.decoded.userId,
  });

  const paramsUser: User = await userRepository.findOne({
    userId: req.body.userId,
  });

  if (
    decodedUser.userCategory === "admin" ||
    decodedUser.userCategory === "owner"
  ) {
    return next();
  }

  if (decodedUser.userId !== paramsUser.userId) {
    return res
      .status(401)
      .json({ message: "You are not authorized to update another user." });
  }

  if (decodedUser.userId === paramsUser.userId) {
    return res
      .status(403)
      .json({ message: "you are not authorized to update yourself." });
  }
};

export default categoryValidator;
