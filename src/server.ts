import app from "./app";
import { APP_PORT } from "./config/app";

app.listen(APP_PORT, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server started at http://localhost:${APP_PORT}`);
});
