import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import Map from './pages_/Map/map';
import CafePage from './pages_/Detalhes/Cafe/cafePage';
import MilhoPage from './pages_/Detalhes/Milho/milhoPage';
import CaprinoOvinoPage from './pages_/Detalhes/CaprinoOvino/CaprinoOvinoPage';
import Header from './components/Layout/Header/header';
import GadoCortePage from './pages_/Detalhes/GadoCorte/gadoCortePage';
import GadoLeitePage from './pages_/Detalhes/GadoLeite/gadoLeitePage';
import PredioPage from './pages_/Detalhes/Predios/Predio';
import DetalhesListaPage from './pages_/Lista/DetalhesListaPage';
import Gaveta from './components/Layout/Sidebar/gaveta';
import CafeList from './pages_/Lista/CafeList';


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
  {
    path: '/CafeList/',
    element: <CafeList/>,
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
