import { FC, useState } from "react";
import { useSelector } from "react-redux";
import clsx from "clsx";

import { StationItem } from "../../components/station-item/station-item";
import { useDispatch } from "../../hooks/use-dispatch";
import { getStations, getStationsError } from "../../store/selectors/stations";
import { addStations } from "../../store/slices/stations";
import { StationsParamsData } from "../../types/stations";

import styles from "./station-tab.module.scss";

const emptyForm = {
  name: "",
  latitude: 0,
  longitude: 0,
  altitude: 0,
};

export const StationTab: FC = () => {
  const dispatch = useDispatch();
  const stations = useSelector(getStations);
  const error = useSelector(getStationsError);
  const [formData, setFormData] = useState<StationsParamsData>(emptyForm);
  const [loading, setLoading] = useState(false);

  const onChange = (value: string | number, title: string) => {
    setFormData({
      ...formData,
      [title]: value,
    });
  };

  const onSubmit = async () => {
    setLoading(true);
    await dispatch(addStations(formData));
    setLoading(loading);
    setFormData(emptyForm);
  };

  return (
    <div>
      <div className={clsx(styles.addStationForm)}>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
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
            value={formData.latitude}
            className={clsx(
              styles.numberInput,
              styles.addStationInput,
              error && styles.inputErrorState
            )}
            onChange={(e) => onChange(parseInt(e.target.value, 10), "latitude")}
          />
          <input
            type="number"
            placeholder="Longitude"
            value={formData.longitude}
            className={clsx(
              styles.numberInput,
              styles.addStationInput,
              error && styles.inputErrorState
            )}
            onChange={(e) =>
              onChange(parseInt(e.target.value, 10), "longitude")
            }
          />
          <input
            type="number"
            placeholder="Altitude"
            value={formData.altitude}
            className={clsx(
              styles.numberInput,
              styles.addStationInput,
              error && styles.inputErrorState
            )}
            onChange={(e) => onChange(parseInt(e.target.value, 10), "altitude")}
          />
          <button className={clsx(styles.addBtn)} onClick={onSubmit}>
            {loading && (
              <img
                className={clsx(styles.loadingImg)}
                src="/images/small_loading.gif"
              />
            )}
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
