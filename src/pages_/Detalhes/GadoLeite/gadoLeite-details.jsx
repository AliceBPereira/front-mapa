import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../lib/axios";
import Grafico from "./grafico";

import { DetailsMiniMap } from "../../../components/details-mini-map/details-mini-map";

import styles from './gadoLeite-details.module.scss';

const GadoLeiteDetails = () => {
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
    <div className={styles.container}>
      <div className={styles.mapContainer}>
        <DetailsMiniMap coordinates={gadoLeiteDetails.localizacao.coordenadas}/>
      </div>

      <div className={styles.infoContainer}>
        <h2>Detalhes do gadoLeite: {gadoLeiteDetails.talhao}</h2>
        <div className="graficoContainer">
          <Grafico talhaoId={gadoLeiteDetails.talhao} />
        </div>

        <div  className={styles.info}>
          <h1>{gadoLeiteDetails.talhao}</h1>
          <div className={styles.infoLabels}>
            <div>
              <strong>Área em Hectares: </strong>
              <span>{gadoLeiteDetails.area_ha}</span>
            </div>
            <div>
              <strong>Espaçamento: </strong>
              <span>{gadoLeiteDetails.espacament}</span>
            </div>
            <div>
              <strong>Sistema de plantação: </strong>
              <span>{gadoLeiteDetails.sist_plant}</span>
            </div>
            <div>
              <strong>Sementes: </strong>
              <span>{gadoLeiteDetails.sementes}</span>
            </div>
            <div>
              <strong>Produção tha: </strong>
              <span>{gadoLeiteDetails.prod_tha}</span>
            </div>
            <div>
              <strong>Produção de 2020: </strong>
              <span>{gadoLeiteDetails.prod_2020}</span>
            </div>
            <div>
              <strong>Plantio de 2021: </strong>
              <span>{gadoLeiteDetails.plantio_21}</span>
            </div>
            <div>
              <strong>Plantio de 2020: </strong>
              <span>{gadoLeiteDetails.plantio_20}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GadoLeiteDetails;
