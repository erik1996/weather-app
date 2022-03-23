import { API_KEY } from "../../const";
import { Stations } from "../../types/stations";
import { ApiMethodDeclaration } from "../types";

type ParamsData = string;

type ResponseData = Stations;

export const removeStations: ApiMethodDeclaration<ParamsData, ResponseData> = (
  id
) => {
  return {
    url: `/stations/${id}?appid=${API_KEY}`,
    method: "DELETE",
  };
};