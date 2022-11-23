import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Hymn } from "../entities";

interface IHymnRepo {
  save: (hymn: Partial<Hymn>) => Promise<Hymn>;
  all: () => Promise<Hymn[]>;
  findOne: (payload: object) => Promise<Hymn>;
}

class HymnRepo implements IHymnRepo {
  private ormRepo: Repository<Hymn>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(Hymn);
  }

  save = async (hymn: Partial<Hymn>) => await this.ormRepo.save(hymn);
  all = async () => await this.ormRepo.find();
  findOne = async (payload: object) => {
    return await this.ormRepo.findOneBy({ ...payload });
  };
}

export default new HymnRepo();
