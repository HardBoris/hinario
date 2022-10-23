import { Router } from "express";
import { userController } from "../controllers/";
import categoryValidator from "../middlewares/categoryValidator.middleware";
import ownerValidator from "../middlewares/ownerValidator.middleware";
import tokenValidator from "../middlewares/tokenValidator.middleware";
import keyValidator from "../middlewares/validateKeyUpdater.middleware";
import validadeSchema from "../middlewares/validateSchema.middleware";
import verifyUserExists from "../middlewares/verifyUserExists.middleware";
import { createUserSchema } from "../schemas/user/createUser.schema";
import loginUserSchema from "../schemas/user/loginUser.schema";
import { updateUserSchema } from "../schemas/user/updateUser.schema";
import { userService } from "../services";

const userRouter = Router();

userRouter.get(
  "/users",
  tokenValidator,
  ownerValidator,
  userController.loaderUser
);

userRouter.post(
  "/users/login",
  validadeSchema(loginUserSchema),
  userController.loginUser
);

userRouter.post(
  "/users/register",
  validadeSchema(createUserSchema),
  verifyUserExists,
  userController.createUser
);

userRouter.patch(
  "/users/updater",
  tokenValidator,
  categoryValidator,
  validadeSchema(updateUserSchema),
  userController.updateUser
);

export default userRouter;
