import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../lib/axios";


const GadoCortePage = () => {
  const { id } = useParams();
  const [gadoCorteDetails, setGadoCorteDetails] = useState(null);

  useEffect(() => {
    const fetchGadoCorteDetails = async () => {
      try {
        const response = await api.get(`/gadosCortes/${id}`);
        setGadoCorteDetails(response.data.gadoCorte);
      } catch (err) {
        console.log(err);
      }
    };

    fetchGadoCorteDetails();
  }, [id]);

  if (!gadoCorteDetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
    
      <div>
        <h1>{gadoCorteDetails.talhao}</h1>
        <div>
          
          <strong>Área em Hectares: </strong>
          <span>{gadoCorteDetails.area_ha}</span>
          <strong>Espaçamento: </strong>
          <span>{gadoCorteDetails.espacament}</span>
          <strong>Estande: </strong>
          <span>{gadoCorteDetails.estande}</span>
          <strong>Numero de Plantas: </strong>
          <span>{gadoCorteDetails.n_de_plantas}</span>
          <strong>Ano de Plantio: </strong>
          <span>{gadoCorteDetails.ano_plantio}</span>
        </div>
      </div>
   
      
    </>
  );
};

export default GadoCortePage;
