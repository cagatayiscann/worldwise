import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Product from './pages/Product';
import Pricing from './pages/Pricing';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import AppLayout from './pages/AppLayout';
import PageNotFound from './pages/PageNotFound';
import CountryList from './components/CountryList';
import CityList from './components/CityList';
import City from './components/City';
import Form from './components/Form';

const BASE_URL = 'http://localhost:9000';

function App() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);

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

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="app" element={<AppLayout />}>
            <Route index element={<Navigate replace to="cities" />}></Route>
            <Route
              path="cities"
              element={<CityList cities={cities} loading={loading} />}
            />
            <Route path="cities/:id" element={<City />} />
            <Route
              path="countries"
              element={<CountryList cities={cities} loading={loading} />}
            />
            <Route path="form" element={<Form />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
