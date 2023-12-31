import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../lib/axios";
import Map from "../../Map/map";
import Grafico from "./grafico";
import "./styles.css";

const CafePage = () => {
  const { id } = useParams();
  const [coffeeDetails, setCoffeeDetails] = useState(null);

  useEffect(() => {
    const fetchCoffeeDetails = async () => {
      try {
        const response = await api.get(`/cafes/${id}`);
        setCoffeeDetails(response.data.cafe);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCoffeeDetails();
  }, [id]);

  if (!coffeeDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flexContainer">
      <div className="mapContainer">
        <Map className="map" />
      </div>
    


      <div className="infoContainer">
        <div className="graficoContainer">
          <Grafico talhaoId={coffeeDetails.talhao} />
        </div>
       
        <div
          className="info"
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            margin: "10px",
            borderRadius: "8px",
          }}
        >
          <h1>{coffeeDetails.talhao}</h1>

          <div style={{ marginTop: "10px" }}>
            <div>
              <strong>Área em Hectares: </strong>
              <span>{coffeeDetails.area_ha}</span>
            </div>

            <div>
              <strong>Espaçamento: </strong>
              <span>{coffeeDetails.espacament}</span>
            </div>

            <div>
              <strong>Estande: </strong>
              <span>{coffeeDetails.estande}</span>
            </div>

            <div>
              <strong>Numero de Plantas: </strong>
              <span>{coffeeDetails.n_de_plantas}</span>
            </div>

            <div>
              <strong>Ano de Plantio: </strong>
              <span>{coffeeDetails.ano_plantio}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CafePage;
