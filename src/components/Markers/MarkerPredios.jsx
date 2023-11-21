// LocalMarkers.jsx
import React, { useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Link } from "react-router-dom";
import { api } from "../../lib/axios";
import markeredificios from "../Icon/pino-de-localizacao (1).png";
import "./LocalMarkers.css"; // Importa o arquivo CSS

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
            <div className="markerPopup">
              <div>
                <Link to={`/CafePage/${predio.id}`} className="markerPopupLink">
                  <button className="markerPopupButton">
                    Detalhes
                  </button>
                </Link>
              </div>
              <div>
                <strong>Predio:</strong>
                <span>{predio.nome}</span>
              </div>
              <div>
                <strong>Área em Hectares: </strong>
                <span>{predio.area_ha}</span>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
};

export default LocalMarkers;
