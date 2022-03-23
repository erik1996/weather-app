import { v4 as uuid } from "uuid";

import { API_KEY } from "../../const";
import { Stations, StationsParamsData } from "../../types/stations";
import { ApiMethodDeclaration } from "../types";

const uniqueId = uuid();

type ParamsData = StationsParamsData;

type ResponseData = Stations;

export const addStations: ApiMethodDeclaration<ParamsData, ResponseData> = (
  data
) => ({
  url: `/stations?&appid=${API_KEY}`,
  baseURL:
    "https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/3.0",
  method: "POST",
  data: {
    ...data,
    external_id: uniqueId,
  },
});
