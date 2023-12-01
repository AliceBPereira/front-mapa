import React, { useEffect, useState } from "react";
import { Polygon, Popup } from "react-leaflet";
import { api } from "../../lib/axios";
import { Link } from "react-router-dom";

const greenOptions = { color: "green" };

const CafePolygons = () => {
  const [cafes, setCafes] = useState([]);
  const [loading, setLoading] = useState(false);
 
  const requestCafes = async () => {
    setLoading(true);
    try {
      const response = await api.get("/cafes");
      setCafes(response.data.cafes);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    requestCafes();
  }, []);

  if (loading) {
    return <></>;
  }

  // Sort cafes based on the registration date in descending order
  const sortedCafes = cafes.sort((a, b) => new Date(b.ano_plantio) - new Date(a.ano_plantio
    ));

  const lastTalhao = sortedCafes[0]; // Get the first cafe (last registered)

  return (
    <>
      {lastTalhao && (
        <Polygon
          key={lastTalhao.id}
          pathOptions={greenOptions}
          positions={lastTalhao.localizacao?.coordenadas}
          
        >
          <Popup>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div>
                <Link to={`/CafePage/${lastTalhao.id}`} style={{ textDecoration: "none" }}>
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
                <span>{lastTalhao.talhao}</span>
              </div>
              <div>
                <strong>Área em Hectares: </strong>
                <span>{lastTalhao.area_ha}</span>
                <strong>Espaçamento: </strong>
                <span>{lastTalhao.espacament}</span>
                <strong>Estande: </strong>
                <span>{lastTalhao.estande}</span>
                <strong>Numero de Plantas: </strong>
                <span>{lastTalhao.n_de_plantas}</span>
                <strong>Ano de Plantio: </strong>
                <span>{lastTalhao.ano_plantio}</span>
              </div>
            </div>
          </Popup>
        </Polygon>
      )}
    </>
  );
};

export default CafePolygons;
