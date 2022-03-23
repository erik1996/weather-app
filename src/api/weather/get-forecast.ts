import { API_KEY } from "../../const";
import { Forecast } from "../../types/forecast";
import { ApiMethodDeclaration } from "../types";

type ParamsData = {
  lat: number;
  lon: number;
};

type ResponseData = Forecast;

export const getForecast: ApiMethodDeclaration<ParamsData, ResponseData> = ({
  lat,
  lon,
}) => ({
  url: `/onecall?units=metric&lat=${lat}&lon=${lon}&appid=${API_KEY}`,
  method: "GET",
});
