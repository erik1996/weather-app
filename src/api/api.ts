import { SERVICE_API_URL } from "../const";

import { initApi } from "./init-api";
import { stations } from "./stations";
import { weather } from "./weather";

export const api = {
  weather: initApi(weather, {
    baseURL: `${SERVICE_API_URL}/2.5`,
  }),
  stations: initApi(stations, {
    baseURL: `${SERVICE_API_URL}/3.0`,
  }),
};
