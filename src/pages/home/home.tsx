import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import clsx from "clsx";

import { Layout } from "../../components/layout/layout";
import { StationTab } from "../../components/station-tab/station-tab";
import { WeatherTab } from "../../components/weather-tab/weather-tab";
import { useDispatch } from "../../hooks/use-dispatch";
import { getForecastLoading } from "../../store/selectors/forecast";
import { getWeatherLoading } from "../../store/selectors/weather";
import { fetchStations } from "../../store/slices/stations";
import { fetchCurrentWeather } from "../../store/slices/weather";
import { Location } from "../../types/utils";

import styles from "./home.module.scss";

export const Home: FC = () => {
  const dispatch = useDispatch();
  const weatherLoading = useSelector(getWeatherLoading);
  const forecastLoading = useSelector(getForecastLoading);
  const [location, setLocation] = useState<Location | null>(null);
  const [tab, setTab] = useState(1);

  useEffect(() => {
    if (tab === 2) {
      dispatch(fetchStations());
    }
  }, [dispatch, tab]);

  useEffect(() => {
    if (!location) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          setLocation({
            lat: position?.coords?.latitude,
            lon: position.coords.longitude,
          });
        },
        function () {
          dispatch(fetchCurrentWeather({ cityName: "Riyadh" }));
        }
      );
    }

    if (location) {
      dispatch(fetchCurrentWeather(location));
    }
  }, [dispatch, location]);

  return (
    <div className={clsx(styles.homePage)}>
      <Layout>
        <div className={clsx(styles.tabContainer)}>
          <button className={clsx(styles.tab)} onClick={() => setTab(1)}>
            Weather
          </button>
          <button className={clsx(styles.tab)} onClick={() => setTab(2)}>
            Weather Stations
          </button>
          {console.log(weatherLoading)}
          {console.log(forecastLoading)}
        </div>
        {!weatherLoading &&
          !forecastLoading &&
          (tab === 1 ? <WeatherTab /> : <StationTab />)}
      </Layout>
      {(weatherLoading || forecastLoading) && (
        <div className={clsx(styles.loadingContainer)}>
          <img className={clsx(styles.loadingImg)} src="/images/loading.gif" />
        </div>
      )}
    </div>
  );
};
