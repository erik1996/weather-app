import { FC, useMemo } from "react";
import SVG from "react-inlinesvg";
import { useSelector } from "react-redux";
import clsx from "clsx";
import moment from "moment";

import {
  getCurrentWeather,
  getWeatherLoading,
} from "../../store/selectors/weather";

import styles from "./layout.module.scss";

export const Layout: FC = ({ children }) => {
  const currentWeather = useSelector(getCurrentWeather);
  const loading = useSelector(getWeatherLoading);

  const findBgImageName = (weather: string | null) => {
    if (weather) {
      if (weather === "snow") {
        return "snow";
      }
      if (["shower rain", "rain"].includes(weather)) {
        return "rain";
      }
      if (["clear sky", "clear"].includes(weather)) {
        return "sunny";
      }
    }
    return "cloudy";
  };

  const getBgImage = useMemo(() => {
    const weather = currentWeather?.weather[0].main.toLocaleLowerCase();
    if (weather) {
      return findBgImageName(weather);
    }
  }, [currentWeather]);

  return (
    <div
      className={clsx(styles.layoutContainer)}
      style={{
        backgroundImage: `url(/images/${getBgImage || "cloudy"}.png )`,
      }}
    >
      <div className={clsx(styles.leftSideContainer)}>
        {!loading && currentWeather && (
          <div className={clsx(styles.leftContent)}>
            <h3 className={clsx(styles.temperature)}>
              {currentWeather?.main?.temp &&
                Math.round(currentWeather?.main?.temp)}
            </h3>
            <div>
              <div className={clsx(styles.leftContentInfo)}>
                <h3 className={clsx(styles.cityName)}>{currentWeather.name}</h3>
                <SVG
                  className={clsx(styles.leftContentInfoIcon)}
                  src={`/icons/${currentWeather.weather[0].icon}.svg`}
                />
              </div>
              <div className={clsx(clsx(styles.leftContentDate))}>
                {moment(new Date()).format("hh:mm A - dddd, DD MMMM ")}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={clsx(styles.rightSideContainer)}>
        <div className={clsx(styles.rightContent)}>{children}</div>
      </div>
    </div>
  );
};
