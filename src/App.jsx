import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import Map from './pages_/Map/map';
import CafePage from './pages_/Detalhes/Cafe/coffee-details';
import CaprinoOvinoPage from './pages_/Detalhes/CaprinoOvino/CaprinoOvinoPage';
import Header from './components/Layout/Header/header';
import GadoCortePage from './pages_/Detalhes/GadoCorte/gadoCortePage';
import GadoLeitePage from './pages_/Detalhes/GadoLeite/gadoLeitePage';
import PredioPage from './pages_/Detalhes/Predios/Predio';
import DetalhesListaPage from './pages_/Lista/DetalhesListaPage';

import CafeList from './pages_/Lista/cafe/coffee-metrics';
import MilhoList from './pages_/Lista/milho/milho-metrics';
import CaprinoOvinoList from './pages_/Lista/milho/milho-metrics'

import styles from './app.module.scss'
import MilhoDetails from './pages_/Detalhes/Milho/corn-details';

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
    element: <MilhoDetails />,
  },
  {
    path: '/CaprinoOvinoPage/:id',
    element: <CaprinoOvinoPage />,
  },
  {
    path: '/GadoCortePage/:id',
    element: <GadoCortePage />,
  },
  {
    path: '/GadoLeitePage/:id',
    element: <GadoLeitePage />,
  },
  {
    path: '/PredioPage/:id',
    element: <PredioPage />,
  },
  {
    path: '/DetalhesListaPage/',
    element: <DetalhesListaPage />,
  },
  {
    path: '/CafeList/',
    element: <CafeList />,
  },
  {
    path: '/MilhoList/',
    element: <MilhoList />,
  },
  {
    path: '/CaprinoOvinoList/',
    element: <CaprinoOvinoList />,
  },
]);

export default function App() {
  return (
    <BrowserRouter>
      <div className={styles.container}>
        <Header />
        <div className={styles.content}>
          <Routes>
            {router.routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
