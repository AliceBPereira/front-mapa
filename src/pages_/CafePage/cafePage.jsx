import React from "react";

import Header from "../../components/Layout/Header/header";
import Map from "../Map/map";
import Cafes from "./grafico";
import Table from "./table";
import Sidebar from "../../components/Layout/Sidebar/Sidebar";
import '../../App.css'
import Cadastro from "../../components/Cadastro/cadastrar"



const CafePage = () => {
  const pageStyle = {
    display: "flex",
    flexDirection: "row",
  };

 const infoStyle = {
  height: "100px", // Use uma string para especificar a altura com a unidade de medida (por exemplo, "px" para pixels)
  width: "200px", // Use uma string para especificar a largura com a unidade de medida
};

  const mapStyle = {
    flex: 1,
    height: "400px",
  };
  // Coordenadas iniciais do mapa
  const rowStyle = {
    display: "flex",
    justifyContent: "space-between", // Isso irá distribuir os elementos igualmente na linha
  };
  return (
    <div>
      <div style={pageStyle}>
        <div >
        
        <div >
      <Cadastro></Cadastro>
      <Cafes></Cafes>
      <Table></Table>
    </div>
 
          <h1>Informações</h1>
          <p>Coloque suas informações aqui...</p>
        </div>
        <div style={mapStyle}>
         
          {/* Mapa */}
        </div>
      </div>
    </div>
  );
};

export default CafePage;
