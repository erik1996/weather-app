import { FC, useState } from "react";
import SVG from "react-inlinesvg";
import { useSelector } from "react-redux";
import clsx from "clsx";

import { ForecastItem } from "../../components/forecast-item/forecast-item";
import { useDispatch } from "../../hooks/use-dispatch";
import { getForecast } from "../../store/selectors/forecast";
import { getWeatherError } from "../../store/selectors/weather";
import {
  fetchCurrentWeather,
  setCurrentWeather,
} from "../../store/slices/weather";
import { ForecastWeatherItem } from "../../types/forecast";

import styles from "./weather-tab.module.scss";

export const WeatherTab: FC = () => {
  const dispatch = useDispatch();
  const forecast = useSelector(getForecast);
  const error = useSelector(getWeatherError);
  const [citeName, setCityName] = useState("");

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(setCurrentWeather(null));
    dispatch(fetchCurrentWeather({ cityName: citeName }));
  };

  return (
    <div>
      {error && <h3 className={clsx(styles.errorMessage)}>Wrong City Name</h3>}
      <form
        onSubmit={(event) => onSubmit(event)}
        className={clsx(styles.searchForm)}
      >
        <input
          type="text"
          className={clsx(styles.searchInput, error && styles.inputErrorState)}
          placeholder="Search for city"
          onChange={(e) => setCityName(e.target.value)}
        />
        <SVG
          onClick={onSubmit}
          className={clsx(styles.searchIcon)}
          src="/icons/search.svg"
        />
      </form>
      <h3 className={clsx(styles.forecastHeader)}>8-Day Forecast</h3>
      <div className={clsx(styles.forecastList)}>
        {forecast?.daily.map((item: ForecastWeatherItem) => (
          <ForecastItem item={item} key={item.dt} />
        ))}
      </div>
    </div>
  );
};
