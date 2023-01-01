import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import { errorHandler } from "./errors";
import cors from "cors";
import registerRouters from "./routes";

const app = express();
app.use(cors());
app.use(express.json());
registerRouters(app);

app.use((err: Error, _: Request, res: Response, __: NextFunction) => {
  return errorHandler(err, res);
});

export default app;
