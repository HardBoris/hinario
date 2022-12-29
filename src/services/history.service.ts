import { Request, Response } from "express";
import { AssertsShape } from "yup/lib/object";
import { History, User } from "../entities";
import { historyRepository, userRepository } from "../repositories";
import { serializedCreateHistorySchema } from "../schemas/history/createhistory.schema";
import { getAllHistorySchema } from "../schemas/history/getAllHistory.schema";

interface IHistory {
  status: number;
  message: object;
}

class HistoryService {
  historyUser = async ({ decoded }: Request) =>
    await userRepository.findOne({ userId: decoded.userId });

  history = async ({ decoded }: Request) =>
    await historyRepository.allByUser({
      where: { user: { userId: decoded.userId } },
    });

  historyLoader = async (req: Request) => {
    const history: History[] = await historyRepository.all();
    return {
      status: 200,
      history: history,
    };
  };

  historyCreator = async (req: Request): Promise<AssertsShape<any>> => {
    const user = await this.historyUser(req);

    const body = req.body;

    const history: History = await historyRepository.save({
      ...body,
      user: user.userId,
    });
    // console.log(this.history(req));
    return await serializedCreateHistorySchema.validate(history, {
      stripUnknown: true,
    });
  };

  favoritMarker = async (req: Request) => {
    const user = await this.historyUser(req);

    const history = await this.history(req);

    const body = req.body;
    body.user = user.userId;
    console.log(history);
    const favorit: History = await historyRepository.findOne({
      hymnId: body.hymnId,
      user: { userId: body.user },
    });
    console.log(favorit);

    favorit.isFavorite = body.isFavorite;
    const updateHistory = await historyRepository.save(favorit);
    return updateHistory;
  };
}

export default new HistoryService();
