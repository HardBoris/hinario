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
    return await serializedCreateHistorySchema.validate(history, {
      stripUnknown: true,
    });
  };

  favoritMarker = async (req: Request, res: Response) => {
    const user = await this.historyUser(req);

    const body = req.body;

    try {
      const favorit: History = await historyRepository.findOne({
        hymnId: body.hymnId,
        user: { userId: user.userId },
      });

      if (!favorit) {
        body.isFavorite = true;
        const updateHistory: History = await historyRepository.save({
          ...body,
          user: user.userId,
        });
        return updateHistory;
      } else {
        favorit.isFavorite = !favorit.isFavorite;
        const updateHistory = await historyRepository.save(favorit);
        return updateHistory;
      }
    } catch (error) {
      return res.status(404);
    }
  };
}

export default new HistoryService();
