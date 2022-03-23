import { FC, useState } from "react";
import { useSelector } from "react-redux";
import clsx from "clsx";

import { StationItem } from "../../components/station-item/station-item";
import { useDispatch } from "../../hooks/use-dispatch";
import { getStations, getStationsError } from "../../store/selectors/stations";
import { addStations } from "../../store/slices/stations";
import { StationsParamsData } from "../../types/stations";

import styles from "./station-tab.module.scss";

export const StationTab: FC = () => {
  const dispatch = useDispatch();
  const stations = useSelector(getStations);
  const error = useSelector(getStationsError);
  const [formData, setFormData] = useState<StationsParamsData>({
    name: "",
    latitude: NaN,
    longitude: NaN,
    altitude: NaN,
  });

  const onChange = (value: string, title: string) => {
    setFormData({
      ...formData,
      [title]: value,
    });
  };

  const onSubmit = () => {
    dispatch(addStations(formData));
  };

  return (
    <div>
      <div className={clsx(styles.addStationForm)}>
        {console.log(">>>", error)}
        <input
          type="text"
          placeholder="Name"
          className={clsx(
            styles.nameInput,
            styles.addStationInput,
            error && styles.inputErrorState
          )}
          onChange={(e) => onChange(e.target.value, "name")}
        />
        <div className={clsx(styles.numberInputContainer)}>
          <input
            type="number"
            placeholder="Latitude"
            className={clsx(
              styles.numberInput,
              styles.addStationInput,
              error && styles.inputErrorState
            )}
            onChange={(e) => onChange(e.target.value, "latitude")}
          />
          <input
            type="number"
            placeholder="Longitude"
            className={clsx(
              styles.numberInput,
              styles.addStationInput,
              error && styles.inputErrorState
            )}
            onChange={(e) => onChange(e.target.value, "longitude")}
          />
          <input
            type="number"
            placeholder="Altitude"
            className={clsx(
              styles.numberInput,
              styles.addStationInput,
              error && styles.inputErrorState
            )}
            onChange={(e) => onChange(e.target.value, "altitude")}
          />
          <button className={clsx(styles.addBtn)} onClick={onSubmit}>
            Add
          </button>
        </div>
      </div>
      <div className={clsx(styles.stationHeader)}>
        <span className={clsx(styles.stationHeaderNameColumn)}>Name</span>
        <span>Latitude</span>
        <span>Longitude</span>
        <span>Altitude</span>
      </div>
      <div className={clsx(styles.stationsList)}>
        {stations?.map((item) => (
          <StationItem item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};
