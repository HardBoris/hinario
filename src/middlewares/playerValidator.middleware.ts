import { NextFunction, Request, Response } from "express";
import { User } from "../entities";
import { userRepository } from "../repositories";

const playerValidator = async (
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
    decodedUser.userCategory === "owner" ||
    decodedUser.userCategory === "player"
  ) {
    return next();
  } else {
    return res
      .status(401)
      .json({ message: "You are not authorized to get the hymns list." });
  }
};

export default playerValidator;
