import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import Sidebar from './components/Layout/Sidebar/Sidebar';
import Map from './pages_/Map/map';
import CafePage from './pages_/CafePage/cafePage';
import MilhoPage from './pages_/Milho/milhoPage';
import CaprinoOvinoPage from './pages_/CaprinoOvino/CaprinoOvinoPage';
import Header from './components/Layout/Header/header';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Map />,
  },
  {
    path: '/CafePage/:id',
    element: <CafePage />,
  },
  {
    path: '/MilhoPage/:id',
    element: <MilhoPage />,
  },
  {
    path: '/CAprinoOvinoPage/:id',
    element: <CaprinoOvinoPage />,
  },
]);

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {router.routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={route.element}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}
