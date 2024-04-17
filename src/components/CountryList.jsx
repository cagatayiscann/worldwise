import Spinner from './Spinner';
import styles from './CountryList.module.css';
import CountryItem from './CountryItem';
import { useContext } from 'react';
import { CitiesContext } from '../contexts/CitiesContext';

function CountryList() {
  const { cities, loading } = useContext(CitiesContext);

  if (loading) return <Spinner />;

  const countries = cities.reduce((acc, cur) => {
    if (!acc.map((el) => el.country).includes(cur.country))
      return [...acc, { country: cur.country, emoji: cur.emoji }];
    else return acc;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

export default CountryList;
