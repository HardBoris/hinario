import { Request, Response } from "express";
import { hymnService } from "../services";

class HymnController {
  hymnLoader = async (req: Request, res: Response) => {
    const { status, hymns } = await hymnService.hymnLoader(req);
    return res.status(status).json(hymns);
  };
}

export default new HymnController();
