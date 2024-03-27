import React, { useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { DetailsButton } from "../details-button/details-button";
import { api } from "../../lib/axios";
import markeredificios from "../Icon/pino-de-localizacao (1).png";
import "./LocalMarkers.css"; // Importa o arquivo CSS
import styles from './styles.module.scss'

const Iconlugar = new L.Icon({
  iconUrl: markeredificios,
  popupAnchor: [-0, -0],
  iconSize: [32, 32],
});

const LocalMarkers = () => {
  const [predios, setPredios] = useState([]);
  const [loading, setLoading] = useState(false);

  const requestPredios = async () => {
    setLoading(true);
    try {
      const response = await api.get('/predios');
      setPredios(response.data.predios);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    requestPredios();
  }, []);

  if (loading) {
    return <></>;
  }

  return (
    <>
      {predios.map((predio) => (
        <Marker key={predio.id} icon={Iconlugar} position={predio.localizacao}>
          <Popup>
            <div className={styles.info}>
              <div>
              <div>
                <DetailsButton url={`/PredioPage/${predio.id}`} />
              </div>
              </div>
              <div>
                <strong>Predio:</strong>
                <span>{predio.nome}</span>
              </div>
              <div>
                <strong>Descrição: </strong>
                <span>{predio.descricao}</span>
              </div>
              <div className="popupImageContainer">
                <img src={predio.img} alt="Imagem do predio" className="popupImage" />
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
};

export default LocalMarkers;
