import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { User } from "../entities";

const tokenValidator = (req: Request, res: Response, next: NextFunction) => {
  const token: string = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({
        error: {
          message: "Missing authorization token.",
          name: "InvalidHeader",
        },
      });
  }

  return verify(token, process.env.SECRET_KEY, (error, decoded) => {
    if (error) {
      return res.status(403).json({ error });
    }

    req.decoded = decoded as User;

    return next();
  });
};

export default tokenValidator;
