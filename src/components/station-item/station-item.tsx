import { FC } from "react";
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
  return (
    <div className={clsx(styles.stationsItemContainer)}>
      <span className={clsx(styles.name)}>{item.name}</span>
      <span>{item.latitude}</span>
      <span>{item.longitude}</span>
      <span>{item.altitude}</span>
      <SVG
        onClick={() => dispatch(removeStations(item.id))}
        className={clsx(styles.searchIcon)}
        src="/icons/delete.svg"
      />
    </div>
  );
};
