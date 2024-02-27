import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../lib/axios";
import Grafico from "./grafico";

import { DetailsMiniMap } from "../../../components/details-mini-map/details-mini-map";
import styles from '../style/details.module.scss';  // Alterei o nome do módulo

const CaprinoOvinoDetails = () => {  // Alterei o nome da função para CaprinoOvinoDetails
  const { id } = useParams();
  const [caprinoOvinoDetails, setCaprinoOvinoDetails] = useState(null);  // Alterei o nome do estado para caprinoOvinoDetails

  useEffect(() => {
    const fetchCaprinoOvinoDetails = async () => {  // Alterei o nome da função para fetchCaprinoOvinoDetails
      try {
        const response = await api.get(`/caprinosOvinos/${id}`);  // Alterei a rota para "/caprinosOvinos"
        setCaprinoOvinoDetails(response.data.caprinoOvino);  // Alterei o nome do estado para caprinoOvinoDetails
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
    <div className={styles.container}>
      <div className={styles.mapContainer}>
        <DetailsMiniMap coordinates={caprinoOvinoDetails.localizacao.coordenadas}/>
      </div>
    
      <div className={styles.infoContainer}>
        <h2>Detalhes do caprino/ovino: {caprinoOvinoDetails.talhao}</h2>
        <div className="graficoContainer">
          <Grafico talhaoId={caprinoOvinoDetails.talhao} />
        </div>
       
        <div
          className={styles.info}
        >
          <h1>{caprinoOvinoDetails.talhao}</h1>

          <div className={styles.infoLabels}>
            <div>
              <strong>Área em Hectares: </strong>
              <span>{caprinoOvinoDetails.area_ha}</span>
            </div>

            <div>
              <strong>Data de Colheita: </strong>
              <span>{caprinoOvinoDetails.data_colheita}</span>
            </div>

          
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaprinoOvinoDetails;  // Alterei o nome da exportação para CaprinoOvinoDetails
