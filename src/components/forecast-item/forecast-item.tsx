import { FC } from "react";
import SVG from "react-inlinesvg";
import clsx from "clsx";
import moment from "moment";

import { ForecastWeatherItem } from "../../types/forecast";

import styles from "./forecast-item.module.scss";

type Props = {
  item: ForecastWeatherItem;
};

export const ForecastItem: FC<Props> = ({ item }) => {
  return (
    <div className={clsx(styles.forecastItemContainer)}>
      <span className={clsx(styles.forecastItemDay)}>
        {item.dt && moment.unix(item.dt).format("dddd")}
      </span>
      <SVG
        className={clsx(styles.forecastItemIcon)}
        src={`/icons/${item.weather[0].icon}.svg`}
      />
      <span className={clsx(styles.description)}>{item.weather[0].main}</span>
      <span className={clsx(styles.temp)}>{Math.round(item.temp.min)}</span>
      <span className={clsx(styles.temp)}>{Math.round(item.temp.max)}</span>
    </div>
  );
};
