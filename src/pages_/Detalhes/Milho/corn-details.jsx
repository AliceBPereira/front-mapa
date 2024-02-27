import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../lib/axios";
import Grafico from "./grafico";

import { DetailsMiniMap } from "../../../components/details-mini-map/details-mini-map";
import styles from '../style/details.module.scss';

const MilhoDetails = () => {
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
    <div className={styles.container}>
      <div className={styles.mapContainer}>
        <DetailsMiniMap coordinates={milhoDetails.localizacao.coordenadas}/>
      </div>

      <div className={styles.infoContainer}>
        <h2>Detalhes do café: {milhoDetails.talhao}</h2>
        <div className="graficoContainer">
          <Grafico talhaoId={milhoDetails.talhao} />
        </div>

      <div  className={styles.info}>
        <h1>{milhoDetails.talhao}</h1>
        <div className={styles.infoLabels}>
                <div>
                  <strong>Área em Hectares: </strong>
                  <span>{milhoDetails.area_ha}</span>
                </div>
                <div>
                  <strong>Espaçamento: </strong>
                  <span>{milhoDetails.espacament}</span>
                </div>
                <div>
                  <strong>Sistema de plantação: </strong>
                  <span>{milhoDetails.sist_plant}</span>
                </div>
                <div>
                  <strong>Sementes: </strong>
                  <span>{milhoDetails.sementes}</span>
                </div>
                <div>
                  <strong>Produção tha: </strong>
                  <span>{milhoDetails.prod_tha}</span>
                </div>
                <div>
                  <strong>Produção de 2020: </strong>
                  <span>{milhoDetails.prod_2020}</span>
                </div>
                <div>
                  <strong>Plantio de 2021: </strong>
                  <span>{milhoDetails.plantio_21}</span>
                </div>
                <div>
                  <strong>Plantio de 2020: </strong>
                  <span>{milhoDetails.plantio_20}</span>
                </div>
              </div>
      </div>
    </div>
  </div>
  );
};

export default MilhoDetails;
