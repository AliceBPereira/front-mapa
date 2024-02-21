import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import Map from './pages_/Map/map';

import Header from './components/Layout/Header/header';
import PredioPage from './pages_/Detalhes/Predios/Predio';
import DetalhesListaPage from './pages_/Lista/DetalhesListaPage';

import CafeList from './pages_/Lista/cafe/coffee-metrics';
import MilhoList from './pages_/Lista/milho/milho-metrics';
import CaprinoOvinoList from './pages_/Lista/caprinoOvino/caprinoOvino-metrics'
import GadoCorteList from './pages_/Lista/gadoCorte/gadoCorte-metrics';
import GadoLeiteList from './pages_/Lista/gadoLeite/gadoLeite-metrics';

import CafePage from './pages_/Detalhes/Cafe/coffee-details';
import MilhoDetails from './pages_/Detalhes/Milho/corn-details';
import CaprinoOvinoDetails from './pages_/Detalhes/CaprinoOvino/caprinoOvino-details';
import GadoCorteDetails from './pages_/Detalhes/GadoCorte/gadoCorte-details';
import GadoLeiteDetails from './pages_/Detalhes/GadoLeite/gadoLeite-details';

import styles from './app.module.scss'

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
    element: <CaprinoOvinoDetails />,
  },
  {
    path: '/GadoCorteDetails/:id',
    element: <GadoCorteDetails />,
  },
  {
    path: '/GadoLeiteDetails/:id',
    element: <GadoLeiteDetails />,
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
  {
    path: '/GadoCorteList/',
    element: <GadoCorteList />,
  },
  {
    path: '/GadoLeiteList/',
    element: <GadoLeiteList />,
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
