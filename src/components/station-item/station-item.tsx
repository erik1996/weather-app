import { FC, useState } from "react";
import SVG from "react-inlinesvg";
import { useDispatch } from "react-redux";
import clsx from "clsx";

import { removeStations } from "../../store/slices/stations";
import { Stations } from "../../types/stations";

import styles from "./station-item.module.scss";

type Props = {
  item: Stations;
};

export const StationItem: FC<Props> = ({ item }) => {
  const dispatch = useDispatch();
  const [loading, setLoding] = useState(false);
  return (
    <div className={clsx(styles.stationsItemContainer)}>
      <span className={clsx(styles.name)}>{item.name}</span>
      <span>{item.latitude}</span>
      <span>{item.longitude}</span>
      <span>{item.altitude}</span>
      {!loading ? (
        <SVG
          onClick={() => {
            setLoding(true);
            dispatch(removeStations(item.id));
          }}
          src="/icons/delete.svg"
        />
      ) : (
        <img className={clsx(styles.icon)} src="/images/small_loading.gif" />
      )}
    </div>
  );
};
