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
      const response = await api.get("/cafes/last");
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

  return (
    <>
      {cafes.map((cafe) => (
        <Polygon
          key={cafe.id}
          pathOptions={greenOptions}
          positions={cafe.localizacao?.coordenadas}

        >
          <Popup>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div>
                <Link to={`/CafePage/${cafe.id}`} style={{ textDecoration: "none" }}>
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
                <span>{cafe.talhao}</span>
              </div>
              <div>
                <strong>Área em Hectares: </strong>
                <span>{cafe.area_ha}</span>
                <strong>Espaçamento: </strong>
                <span>{cafe.espacament}</span>
                <strong>Estande: </strong>
                <span>{cafe.estande}</span>
                <strong>Numero de Plantas: </strong>
                <span>{cafe.n_de_plantas}</span>
                <strong>Ano de Plantio: </strong>
                <span>{cafe.ano_plantio}</span>
              </div>
            </div>
          </Popup>
        </Polygon>
      ))}
    </>
  );
};

export default CafePolygons;
