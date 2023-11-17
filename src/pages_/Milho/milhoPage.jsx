import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";


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
    
      <div>
        <h1>{milhoDetails.talhao}</h1>
        <div>
          <a>funciona por favor</a>
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
