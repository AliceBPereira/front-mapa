import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../lib/axios";
import Grafico from "./grafico";
import Map from "../../Map/map";
import "./milhoPage.css"

const MilhoPage = () => {
  const { id } = useParams();
  const [milhoDetails, setMilhoDetails] = useState(null);

  useEffect(() => {
    const fetchMilhoDetails = async () => {
      try {
        const response = await api.get(`/milhos/${id}`);
        setMilhoDetails(response.data.milho);
      } catch (err) {
        console.log(err);
      }
    };

    fetchMilhoDetails();
  }, [id]);

  if (!milhoDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flexContainer">
    <div className="mapContainer">
      <Map className="map" />
    </div>

    <div className="infoContainer">
      <div className="graficoContainer">
        <Grafico talhaoId={milhoDetails.talhao} />
      </div>

      <div className="info">
        <h1>{milhoDetails.talhao}</h1>
        <div>
                <strong>Área em Hectares: </strong>
                <span>{milhoDetails.area_ha}</span>
                <strong>Espaçamento: </strong>
                <span>{milhoDetails.espacament}</span>
                <strong>Sistema de plantação: </strong>
                <span>{milhoDetails.sist_plant}</span>
                <strong>Sementes: </strong>
                <span>{milhoDetails.sementes}</span>
                <strong>Produção tha: </strong>
                <span>{milhoDetails.prod_tha}</span>
                <strong>Produção de 2020: </strong>
                <span>{milhoDetails.prod_2020}</span>
                <strong>Plantio de 2021: </strong>
                <span>{milhoDetails.plantio_21}</span>
                <strong>Plantio de 2020: </strong>
                <span>{milhoDetails.plantio_20}</span>
              </div>
      </div>
    </div>
  </div>
  );
};

export default MilhoPage;
