import { Express } from "express";
import userRouter from "./user.route";
import hymnRouter from "./hymn.route";
import historyRouter from "./history.route";

const registerRouters = (app: Express): void => {
  app.use(userRouter);
  app.use(hymnRouter);
  app.use(historyRouter);
};

export default registerRouters;
