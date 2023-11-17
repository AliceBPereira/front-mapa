import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import Map from "../Map/map";
import Search from "./Pesquisa";
import { Chart } from "react-google-charts";

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
    <>
      <div
        style={{
          width: "25%",
          height: "15%",
          position: "absolute",
          top: 0,
          right: 0,
        }}
      >
        <Map></Map>
      </div>
<div className="Grafico">

</div>
      <div>
        <h1>{coffeeDetails.talhao}</h1>
        <div>
          <a>funciona por favor</a>
          <strong>Área em Hectares: </strong>
          <span>{coffeeDetails.area_ha}</span>
          <strong>Espaçamento: </strong>
          <span>{coffeeDetails.espacament}</span>
          <strong>Estande: </strong>
          <span>{coffeeDetails.estande}</span>
          <strong>Numero de Plantas: </strong>
          <span>{coffeeDetails.n_de_plantas}</span>
          <strong>Ano de Plantio: </strong>
          <span>{coffeeDetails.ano_plantio}</span>
        </div>
      </div>
    </>
  );
};

export default CafePage;
