import { Request } from "express";
import { Hymn } from "../entities";
import { hymnRepository } from "../repositories";

class HymnService {
  hymnLoader = async (req: Request) => {
    const hymns: Hymn[] = await hymnRepository.all();
    return {
      status: 200,
      hymns: hymns,
    };
  };
}

export default new HymnService();
