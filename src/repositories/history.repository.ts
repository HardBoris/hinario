import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { History } from "../entities/History";

interface IHistoryRepo {
  save: (history: History) => Promise<History>;
  all: (user: string) => Promise<History[]>;
  findOne: (payload: object) => Promise<History>;
}

class HistoryRepo implements IHistoryRepo {
  private ormRepo: Repository<History>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(History);
  }

  save = async (history: History) => await this.ormRepo.save(history);
  all = async (user: string) => await this.ormRepo.find();
  findOne = async (payload: object) => {
    return await this.ormRepo.findOneBy({ ...payload });
  };
}

export default new HistoryRepo();