import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";


const PredioPage = () => {
  const { id } = useParams();
  const [predioDetails, setPredioDetails] = useState(null);

  useEffect(() => {
    const fetchPredioDetails = async () => {
      try {
        const response = await api.get(`/predios/${id}`);
        setPredioDetails(response.data.predio);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPredioDetails();
  }, [id]);

  if (!predioDetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
    
      <div>
        <h1>{predioDetails.talhao}</h1>
        <div>
      
          <strong>Área em Hectares: </strong>
          <span>{predioDetails.area_ha}</span>
          <strong>Espaçamento: </strong>
          <span>{predioDetails.espacament}</span>
          <strong>Estande: </strong>
          <span>{predioDetails.estande}</span>
          <strong>Numero de Plantas: </strong>
          <span>{predioDetails.n_de_plantas}</span>
          <strong>Ano de Plantio: </strong>
          <span>{predioDetails.ano_plantio}</span>
        </div>
      </div>
   
      
    </>
  );
};

export default PredioPage;
