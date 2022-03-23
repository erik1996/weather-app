import { API_KEY } from "../../const";
import { Weather, WeatherRequestParam } from "../../types/weather";
import { ApiMethodDeclaration } from "../types";

type ParamsData = WeatherRequestParam;

type ResponseData = Weather;

export const getCurrentWeather: ApiMethodDeclaration<
  ParamsData,
  ResponseData
> = (data) => ({
  url: data.cityName
    ? `/weather?units=metric&appid=${API_KEY}&q=${data?.cityName}`
    : `/weather?units=metric&appid=${API_KEY}&lat=${data?.lat}&lon=${data?.lon}`,
  method: "GET",
});
