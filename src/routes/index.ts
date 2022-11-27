import { Express } from "express";
import userRouter from "./user.route";
import hymnRouter from "./hymn.route";

const registerRouters = (app: Express): void => {
  app.use(userRouter);
  app.use(hymnRouter);
};

export default registerRouters;
