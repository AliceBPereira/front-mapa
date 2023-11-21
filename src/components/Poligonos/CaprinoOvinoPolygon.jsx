import React, { useEffect, useState } from "react";
import { Polygon, Popup } from "react-leaflet";
import { api } from "../../lib/axios";
import { Link } from "react-router-dom";

const greenOptions = { color: "green" };

const CaprinoOvinoPolygon = () => {
  const [caprinoOvinos, setCaprinoOvinos] = useState([]);
  const [loading, setLoading] = useState(false);

  const requestCaprinoOvinos = async () => {
    setLoading(true);
    try {
      const response = await api.get('/caprinoOvinos');
      setCaprinoOvinos(response.data.caprinoOvinos);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    requestCaprinoOvinos();
  }, []);

  if (loading) {
    return <></>;
  }

  // Sort caprinoOvinos based on the harvest date in descending order
  const sortedCaprinoOvinos = caprinoOvinos.sort((a, b) => new Date(b.data_colheita) - new Date(a.data_colheita));

  const lastCaprinoOvino = sortedCaprinoOvinos[0]; // Get the first caprinoOvino (last harvested)

  return (
    <>
      {lastCaprinoOvino && (
        <Polygon
          key={lastCaprinoOvino.id}
          pathOptions={greenOptions}
          positions={lastCaprinoOvino.localizacao?.coordenadas}
        >
          <Popup>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div>
                <Link to={`/CaprinoOvinoPage/${lastCaprinoOvino.id}`} style={{ textDecoration: "none" }}>
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                    }}
                  >
                    Detalhes
                  </button>
                </Link>
              </div>
              <div>
                <strong>Talhão:</strong>
                <span>{lastCaprinoOvino.talhao}</span>
              </div>
              <div>
                <strong>Área em Hectares: </strong>
                <span>{lastCaprinoOvino.area_ha}</span>
                <strong>Data de Colheita: </strong>
                <span>{lastCaprinoOvino.data_colheita}</span>
              </div>
            </div>
          </Popup>
        </Polygon>
      )}
    </>
  );
};

export default CaprinoOvinoPolygon;