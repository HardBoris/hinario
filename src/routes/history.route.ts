import { Router } from "express";
import { historyController } from "../controllers";
import ownerValidator from "../middlewares/ownerValidator.middleware";
import playerValidator from "../middlewares/playerValidator.middleware";
import tokenValidator from "../middlewares/tokenValidator.middleware";
import validadeSchema from "../middlewares/validateSchema.middleware";
import { createHistorySchema } from "../schemas/history/createhistory.schema";
import { getAllHistorySchema } from "../schemas/history/getAllHistory.schema";

const historyRouter = Router();

historyRouter.get(
  "/history",
  // validadeSchema(getAllHistorySchema),
  tokenValidator,
  ownerValidator,
  historyController.historyLoader
);

historyRouter.post(
  "/history",
  tokenValidator,
  playerValidator,
  validadeSchema(createHistorySchema),
  historyController.historyCreator
);

historyRouter.patch(
  "/history",
  tokenValidator,
  playerValidator,
  historyController.favoritMarker
);

export default historyRouter;
