import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../lib/axios";
import Grafico from "./grafico";

import { DetailsMiniMap } from "../../../components/details-mini-map/details-mini-map";

import styles from '../style/details.module.scss';

const GadoCorteDetails = () => {
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
    <div className={styles.container}>
      <div className={styles.mapContainer}>
        <DetailsMiniMap coordinates={gadoCorteDetails.localizacao.coordenadas}/>
      </div>
    
      <div className={styles.infoContainer}>
        <h2>Detalhes do gadoCorte: {gadoCorteDetails.Nome_pasto}</h2>
        <div className="graficoContainer">
          <Grafico talhaoId={gadoCorteDetails.talhao} />
        </div>
       
        <div
          className={styles.info}
        >
          <h1>{gadoCorteDetails.Nome_pasto}</h1>

          <div className={styles.infoLabels}>
            <div>
              <strong>Área em Hectares: </strong>
              <span>{gadoCorteDetails.area_ha}</span>
            </div>

            <div>
              <strong>Forrageira: </strong>
              <span>{gadoCorteDetails.Forrageira}</span>
            </div>

            <div>
              <strong>Raca: </strong>
              <span>{gadoCorteDetails.Raca}</span>
            </div>

            <div>
              <strong>Pastejo: </strong>
              <span>{gadoCorteDetails.Pastejo}</span>
            </div>

            <div>
              <strong>Data de Colheita: </strong>
              <span>{gadoCorteDetails.data_colheita}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GadoCorteDetails;
