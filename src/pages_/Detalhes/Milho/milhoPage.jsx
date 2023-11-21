import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../lib/axios";
import Grafico from "./grafico";


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
    <>
    <div className="Grafico">
      <Grafico talhaoId={milhoDetails.talhao} />
      </div>
      <div>
        <h1>{milhoDetails.talhao}</h1>
        <div>
         
          <strong>Área em Hectares: </strong>
          <span>{milhoDetails.area_ha}</span>
          <strong>Espaçamento: </strong>
          <span>{milhoDetails.espacament}</span>
          <strong>Estande: </strong>
          <span>{milhoDetails.estande}</span>
          <strong>Numero de Plantas: </strong>
          <span>{milhoDetails.n_de_plantas}</span>
          <strong>Ano de Plantio: </strong>
          <span>{milhoDetails.ano_plantio}</span>
        </div>
      </div>
   
      
    </>
  );
};

export default MilhoPage;
