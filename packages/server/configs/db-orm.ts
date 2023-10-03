import { DataSource, DataSourceOptions } from "typeorm";
import { ArrangedFlower, Arrangement, Flower, Project, Users, FlowerOrders } from '../db/entities';

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT } = process.env;

const entities = [ArrangedFlower, Arrangement, Flower, Project, Users, FlowerOrders];

const dataSourceOptions: DataSourceOptions = process.env.NODE_ENV === 'production'
  ? {
    url: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    },
    type: "postgres",
    entities,
    logging: true,
    synchronize: false
  }
  : {
    host: "localhost",
    port: 5444,
    username: 'postgres',
    password: 'postgres',
    database: 'floralrecipes',
    type: "postgres",
    entities,
    logging: true,
    synchronize: true
  };

export const ormDb = new DataSource(dataSourceOptions);
