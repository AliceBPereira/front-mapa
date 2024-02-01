import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../lib/axios";
import Grafico from "./grafico";

import { DetailsMiniMap } from "../../../components/details-mini-map/details-mini-map";

import styles from './coffee-details.module.scss';

const CoffeeDetails = () => {
  const { id } = useParams();
  const [coffeeDetails, setCoffeeDetails] = useState(null);

  useEffect(() => {
    const fetchCoffeeDetails = async () => {
      try {
        const response = await api.get(`/cafes/${id}`);
        setCoffeeDetails(response.data.cafe);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCoffeeDetails();
  }, [id]);

  if (!coffeeDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.mapContainer}>
        <DetailsMiniMap coordinates={coffeeDetails.localizacao.coordenadas}/>
      </div>
    


      <div className={styles.infoContainer}>
        <h2>Detalhes do café: {coffeeDetails.talhao}</h2>
        <div className="graficoContainer">
          <Grafico talhaoId={coffeeDetails.talhao} />
        </div>
       
        <div
          className={styles.info}
        >
          <h1>{coffeeDetails.talhao}</h1>

          <div className={styles.infoLabels}>
            <div>
              <strong>Área em Hectares: </strong>
              <span>{coffeeDetails.area_ha}</span>
            </div>

            <div>
              <strong>Espaçamento: </strong>
              <span>{coffeeDetails.espacament}</span>
            </div>

            <div>
              <strong>Estande: </strong>
              <span>{coffeeDetails.estande}</span>
            </div>

            <div>
              <strong>Numero de Plantas: </strong>
              <span>{coffeeDetails.n_de_plantas}</span>
            </div>

            <div>
              <strong>Ano de Plantio: </strong>
              <span>{coffeeDetails.ano_plantio}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoffeeDetails;
