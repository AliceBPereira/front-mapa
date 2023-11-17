import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";


const CaprinoOvinoPage = () => {
  const { id } = useParams();
  const [caprinoOvinoDetails, setCaprinoOvinoDetails] = useState(null);

  useEffect(() => {
    const fetchCaprinoOvinoDetails = async () => {
      try {
        const response = await api.get(`/caprinoOvinos/${id}`);
        setCaprinoOvinoDetails(response.data.caprinoOvino);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCaprinoOvinoDetails();
  }, [id]);

  if (!caprinoOvinoDetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
    
      <div>
        <h1>{caprinoOvinoDetails.talhao}</h1>
        <div>
         
          <strong>Área em Hectares: </strong>
          <span>{caprinoOvinoDetails.area_ha}</span>
          <strong>Espaçamento: </strong>
          <span>{caprinoOvinoDetails.espacament}</span>
          <strong>Estande: </strong>
          <span>{caprinoOvinoDetails.estande}</span>
          <strong>Numero de Plantas: </strong>
          <span>{caprinoOvinoDetails.n_de_plantas}</span>
          <strong>Ano de Plantio: </strong>
          <span>{caprinoOvinoDetails.ano_plantio}</span>
        </div>
      </div>
   
      
    </>
  );
};

export default CaprinoOvinoPage;
