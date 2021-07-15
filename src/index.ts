import { Server } from "./server";
import routes from "./api";

const server = new Server();
(async () => {
    await server.connectMongoo();
})();
server.addRoutes(routes);
server.start();
