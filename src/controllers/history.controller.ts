import { Request, Response } from "express";
import { historyService } from "../services";

class HistoryController {
  historyLoader = async (req: Request, res: Response) => {
    const { status, history } = await historyService.historyLoader(req);
    return res.status(status).json(history);
  };

  historyCreator = async (req: Request, res: Response) => {
    const history = await historyService.historyCreator(req);
    return res.status(201).json(history);
  };

  favoritMarker = async (req: Request, res: Response) => {
    const favorit = await historyService.favoritMarker(req, res);
    return res.status(200).json(favorit);
  };
}

export default new HistoryController();
