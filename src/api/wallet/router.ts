import controller from "./controller";

import { Route } from "../../interfaces/route";

const routes: Route[] = [
  {
    path: "/wallet",
    method: "get",
    handler: [controller.getWallet],
    setPrefix: true,
  },
  {
    path: "/wallet/address",
    method: "post",
    handler: [controller.createAddress],
    setPrefix: true,
  },
];

export default routes;
