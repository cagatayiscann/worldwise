import { createContext, useState, useEffect, useMemo, useContext } from 'react';
import { useParams } from 'react-router-dom';

const BASE_URL = 'http://localhost:9000';
const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentCity, setCurentCity] = useState({});

  useEffect(function () {
    async function fetchCities() {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert('There was an error loading data...');
      } finally {
        setLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurentCity(data);
    } catch {
      alert('There was an error loading data...');
    } finally {
      setLoading(false);
    }
  }

  async function createCity(newCity) {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/cities/`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();

      setCities((cities) => [...cities, data]);
    } catch {
      alert('There was an error loading data...');
    } finally {
      setLoading(false);
    }
  }

  async function deleteCity(id) {
    try {
      setLoading(true);
      await fetch(`${BASE_URL}/cities/`, {
        method: 'DELETE',
      });

      setCities((cities) => cities.filter((city) => city.id !== id));
    } catch {
      alert('There was an error deleting city...');
    } finally {
      setLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{ cities, loading, currentCity, getCity, createCity, deleteCity }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error('PostContext was used outside of the PostProvider');
  return context;
}

export { CitiesProvider, useCities };
