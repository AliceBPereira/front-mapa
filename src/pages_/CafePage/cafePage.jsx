import React from "react";
import "../map.css";
import Header from "../../Layout/header";
import Map from "../map";
import Cafes from "./grafico";

const CafePage = () => {
  const pageStyle = {
    display: "flex",
    flexDirection: "row",
  };

  const infoStyle = {
    flex: 1,
    padding: "20px",
  };

  const mapStyle = {
    flex: 1,
    height: "400px",
  };
  // Coordenadas iniciais do mapa

  return (
    <div>
      <div style={pageStyle}>
        <div style={infoStyle}>
          
          <Cafes></Cafes>
          <h1>Informações</h1>
          <p>Coloque suas informações aqui...</p>
        </div>
        <div style={mapStyle}>
          <Map></Map>
          {/* Mapa */}
        </div>
      </div>
    </div>
  );
};

export default CafePage;
