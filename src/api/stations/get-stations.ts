import { API_KEY } from "../../const";
import { Stations } from "../../types/stations";
import { ApiMethodDeclaration } from "../types";

type ParamsData = undefined;

type ResponseData = Stations[];

export const getStations: ApiMethodDeclaration<
  ParamsData,
  ResponseData
> = () => ({
  url: `/stations?&appid=${API_KEY}`,
  method: "GET",
});
