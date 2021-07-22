/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
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
  {
    path: "/wallet/",
    method: "post",
    handler: [controller.createWallet],
    setPrefix: true,
  },
];

export default routes;
