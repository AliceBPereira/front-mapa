import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";


const GadoLeitePage = () => {
  const { id } = useParams();
  const [gadoLeiteDetails, setGadoLeiteDetails] = useState(null);

  useEffect(() => {
    const fetchGadoLeiteDetails = async () => {
      try {
        const response = await api.get(`/gadosLeite/${id}`);
        setGadoLeiteDetails(response.data.gadoLeite);
      } catch (err) {
        console.log(err);
      }
    };

    fetchGadoLeiteDetails();
  }, [id]);

  if (!gadoLeiteDetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
    
      <div>
        <h1>{gadoLeiteDetails.talhao}</h1>
        <div>
         
          <strong>Área em Hectares: </strong>
          <span>{gadoLeiteDetails.area_ha}</span>
          <strong>Espaçamento: </strong>
          <span>{gadoLeiteDetails.espacament}</span>
          <strong>Estande: </strong>
          <span>{gadoLeiteDetails.estande}</span>
          <strong>Numero de Plantas: </strong>
          <span>{gadoLeiteDetails.n_de_plantas}</span>
          <strong>Ano de Plantio: </strong>
          <span>{gadoLeiteDetails.ano_plantio}</span>
        </div>
      </div>
   
      
    </>
  );
};

export default GadoLeitePage;
