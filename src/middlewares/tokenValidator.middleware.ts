import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { User } from "../entities";

const tokenValidator = (req: Request, res: Response, next: NextFunction) => {
  const token: string = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Missing authorization token." });
  }

  return verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: err });
    }

    req.decoded = decoded as User;

    return next();
  });
};

export default tokenValidator;
