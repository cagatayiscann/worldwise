/* eslint-disable react/prop-types */
import styles from './CityList.module.css';
import Spinner from './Spinner';
import CityItem from './CityItem';
import Message from './Message';
import { CitiesContext } from '../contexts/CitiesContext';
import { useContext } from 'react';

function CityList() {
  const { cities, loading } = useContext(CitiesContext);
  if (loading) return <Spinner />;

  if (!cities.length)
    return (
      <Message
        message={'Add your first city by clicking on a city on the map'}
      />
    );

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
