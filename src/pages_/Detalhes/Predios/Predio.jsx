import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../lib/axios";
import { DetailsMiniMapPredio } from "../../../components/details-mini-map-predio/details-mini-map-predio";
import styles from '../style/details.module-predio.scss';

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
    <div className={styles.container}>
      {/* <div className={styles.mapContainer}>
        <DetailsMiniMapPredio coordinate={predioDetails.localizacao}/>
      </div> */}

      <div className={styles.infoContainer}>
        <h2>Detalhes do prédio: {predioDetails.nome}</h2>

        <div className={styles.info}>
          <h1>{predioDetails.nome}</h1>
          <div className={styles.details}>
            <strong>Detalhes: </strong>
            <span>{predioDetails.detalhes}</span>
          </div>
          <div className={styles.imageContainer}>
            <img src={predioDetails.img} alt="imagem do predio" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredioPage;
