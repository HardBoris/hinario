import { Router } from "express";
import hymnController from "../controllers/hymn.controller";
// import playerValidator from "../middlewares/playerValidator.middleware";
// import tokenValidator from "../middlewares/tokenValidator.middleware";

const hymnRouter = Router();

hymnRouter.get(
  "/hymns",
  // tokenValidator,
  // playerValidator,
  hymnController.hymnLoader
);

export default hymnRouter;
