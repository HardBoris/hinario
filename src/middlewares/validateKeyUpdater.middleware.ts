import { NextFunction, Request, Response } from "express";

const keyValidator = (req: Request) => {
  console.log(req.body);
};

export default keyValidator;
