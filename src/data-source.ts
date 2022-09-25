import "reflect-metadata"
import { DataSource } from "typeorm"
import path from "path";

export const AppDataSource = new DataSource({
    type: "postgres",
    url: "",
    logging: false,
    entities: [path.join(__dirname, “./entities/**/*.{js,ts}”)],
    migrations: [path.join(__dirname, “./migrations/**/*.{js,ts}”)],
});
