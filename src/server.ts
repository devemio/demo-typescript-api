import { createConnection } from "typeorm";
import app from "./app";
import { APP_PORT } from "./config/app";
import connectionOptions from "./config/typeorm";

createConnection(connectionOptions).then(async () => {
    app.listen(APP_PORT, () => {
        // tslint:disable-next-line:no-console
        console.log(`Server started at http://localhost:${APP_PORT}`);
    });
}).catch((e) => /* tslint:disable:no-console */ console.error("Server error", e));
