import { createContext, useEffect, useReducer, useCallback } from 'react';

const BASE_URL = 'http://localhost:9000';

const CitiesContext = createContext();

const initialState = {
  cities: [],
  loading: false,
  currentCity: {},
  error: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return { ...state, loading: true };

    case 'cities/loaded':
      return {
        ...state,
        loading: false,
        cities: action.payload,
      };

    case 'city/loaded':
      return { ...state, loading: false, currentCity: action.payload };

    case 'city/created':
      return {
        ...state,
        loading: false,
        cities: [...state.cities, action.payload],
      };

    case 'city/deleted':
      return {
        ...state,
        loading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };

    case 'rejected':
      return { ...state, loading: false, error: action.payload };

    default:
      throw new Error('Invalid action types');
  }
}

function CitiesProvider({ children }) {
  const [{ cities, loading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: 'loading' });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: 'cities/loaded', payload: data });
      } catch (error) {
        dispatch({
          type: 'rejected',
          payload: 'There was an error loading the data',
        });
      }
    }
    fetchCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === currentCity.id) return;

      dispatch({ type: 'loading' });

      try {
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        dispatch({ type: 'city/loaded', payload: data });
      } catch {
        dispatch({
          type: 'rejected',
          payload: 'There was an error loading the city...',
        });
      }
    },
    [currentCity.id]
  );

  async function createCity(newCity) {
    dispatch({ type: 'loading' });
    try {
      const res = await fetch(`${BASE_URL}/cities/`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();

      dispatch({ type: 'city/created', payload: data });
    } catch (error) {
      dispatch({
        type: 'rejected',
        payload: 'There was an error creating the city',
      });
    }
  }
  async function deleteCity(id) {
    dispatch({ type: 'loading' });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE',
      });

      dispatch({ type: 'city/deleted', payload: id });
    } catch (error) {
      dispatch({
        type: 'rejected',
        payload: 'There was an error deleting the city',
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        loading,
        currentCity,
        error,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export { CitiesProvider, CitiesContext };
