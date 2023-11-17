import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import Map from './pages_/Map/map';
import CafePage from './pages_/Cafe/cafePage';
import MilhoPage from './pages_/Milho/milhoPage';
import CaprinoOvinoPage from './pages_/CaprinoOvino/CaprinoOvinoPage';
import Header from './components/Layout/Header/header';
import GadoCortePage from './pages_/GadoCorte/gadoCortePage';
import GadoLeitePage from './pages_/GadoLeite/gadoLeitePage';
import PredioPage from './pages_/Predios/Predio';
import DetalhesListaPage from './pages_/DeatalhesLista/DetalhesListaPage';
import Gaveta from './components/Layout/Sidebar/gaveta';


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
]);

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Gaveta></Gaveta>
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
