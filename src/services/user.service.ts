import { Request } from "express";
import { sign } from "jsonwebtoken";
import { User } from "../entities";
import { userRepository } from "../repositories";
import { AssertsShape } from "yup/lib/object";
import { hash } from "bcrypt";
import { serializedCreateUserSchema } from "../schemas/user/createUser.schema";
import * as dotenv from "dotenv";
import { serializedUpdatedUserSchema } from "../schemas/user/updateUser.schema";
dotenv.config();

interface ILogin {
  status: number;
  message: object;
}

class UserService {
  loaderUser = async (req: Request) => {
    const users: User[] = await userRepository.all();
    return {
      status: 200,
      users: users,
    };
  };

  loginUser = async ({ validated }: Request): Promise<ILogin> => {
    const user: User = await userRepository.findOne({
      email: validated.email,
    });

    if (!user) {
      return {
        status: 401,
        message: { message: "Invalid credentials" },
      };
    }

    if (!(await user.comparePwd(validated.password))) {
      return {
        status: 401,
        message: { message: "Invalid credentials" },
      };
    }

    const token: string = sign({ ...user }, process.env.SECRET_KEY, {
      expiresIn: process.env.EXPIRES_IN,
    });

    return {
      status: 200,
      message: { token },
    };
  };

  createUser = async ({ validated }: Request): Promise<AssertsShape<any>> => {
    validated.password = await hash(validated.password, 10);
    const user: User = await userRepository.save(validated);

    return await serializedCreateUserSchema.validate(user, {
      stripUnknown: true,
    });
  };

  updateUser = async ({ validated }: Request) => {
    const user: User = await userRepository.findOne({
      userId: validated.userId,
    });
    user.userCategory = validated.userCategory;
    const userUpdate = await userRepository.save(user);
    return await serializedUpdatedUserSchema.validate(userUpdate, {
      stripUnknown: true,
    });
  };
}

export default new UserService();
