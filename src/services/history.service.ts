import { Request, Response } from "express";
import { History, User } from "../entities";
import { historyRepository, userRepository } from "../repositories";

interface IHistory {
  status: number;
  message: object;
}

class HistoryService {
  historyLoader = async (req: Request) => {
    const history: History[] = await historyRepository.all();
    return {
      status: 200,
      history: history,
    };
  };

  /* loginUser = async ({ validated }: Request): Promise<ILogin> => {
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
      message: { user: user.userId, token },
    };
  }; */

  historyCreator = async (req: Request): Promise<History> => {
    const user: User = await userRepository.findOne({
      userId: req.decoded.userId,
    });

    const body = req.body;

    body.user = user.userId;
    const history: History = await historyRepository.save(req.body);
    console.log(req.body);
    return history;
  };

  /* updateUser = async ({ validated }: Request) => {
    const user: User = await userRepository.findOne({
      userId: validated.userId,
    });
    user.userCategory = validated.userCategory;
    const userUpdate = await userRepository.save(user);
    return await serializedUpdatedUserSchema.validate(userUpdate, {
      stripUnknown: true,
    });
  }; */
}

export default new HistoryService();
