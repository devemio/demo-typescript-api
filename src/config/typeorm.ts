import { ConnectionOptions } from "typeorm/connection/ConnectionOptions";

// tslint:disable
const options: ConnectionOptions = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_DATABASE || "bowling",
    synchronize: true,
    logging: false,
    entities: [
        `${__dirname}/../models/**/*{.ts,.js}`
    ],
    migrations: [
        `${__dirname}/../migrations/**/*{.ts,.js}`
    ],
    subscribers: [
        `${__dirname}/../subscribers/**/*{.ts,.js}`
    ]
};

export default options;
