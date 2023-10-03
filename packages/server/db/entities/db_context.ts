import { ormDb } from "configs/db-orm";
import { ArrangedFlower } from "./arranged_flower";
import { Arrangement } from "./arrangement";
import { Flower } from "./flower";
import { FlowerOrders } from "./flower_orders";
import { Project } from "./project";
import { Users } from "./users";

export const dbContext = {
  arrangedFlowers: ormDb.manager.createQueryBuilder(ArrangedFlower, "arranged_flower"),
  arrangements: ormDb.manager.createQueryBuilder(Arrangement, "arrangement"),
  flowerOrders: ormDb.manager.createQueryBuilder(FlowerOrders, "flower_orders"),
  flowers: ormDb.manager.createQueryBuilder(Flower, "flower"),
  projects: ormDb.manager.createQueryBuilder(Project, "project"),
  users: ormDb.manager.createQueryBuilder(Users, "users"),
};
