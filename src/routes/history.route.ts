import { Router } from "express";
import { historyController } from "../controllers";
import ownerValidator from "../middlewares/ownerValidator.middleware";
import playerValidator from "../middlewares/playerValidator.middleware";
import tokenValidator from "../middlewares/tokenValidator.middleware";

const historyRouter = Router();

historyRouter.get(
  "/history",
  tokenValidator,
  ownerValidator,
  historyController.historyLoader
);

historyRouter.post(
  "/history",
  tokenValidator,
  playerValidator,
  historyController.historyCreator
);

export default historyRouter;
