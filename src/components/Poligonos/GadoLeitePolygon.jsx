import React, { useEffect, useState } from "react";
import { Polygon, Popup } from "react-leaflet";
import { api } from "../../lib/axios";
import { Link } from "react-router-dom";

const blackOptions = { color: "black" };

const GadoLeitePolygons = () => {
  const [gadosLeite, setGadosLeite] = useState([]);
  const [loading, setLoading] = useState(false);

  const requestGadosLeite = async () => {
    setLoading(true);
    try {
      const response = await api.get('/gadosLeites');
      setGadosLeite(response.data.gadosLeite);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    requestGadosLeite();
  }, []);

  if (loading) {
    return <></>;
  }

  // Sort gadosLeite based on the harvest date in descending order
  const sortedGadosLeite = gadosLeite.sort((a, b) => new Date(b.data_colheita) - new Date(a.data_colheita));

  const lastGadoLeite = sortedGadosLeite[0]; // Get the first gadoLeite (last harvested)

  return (
    <>
      {lastGadoLeite && (
        <Polygon
          key={lastGadoLeite.id}
          pathOptions={blackOptions}
          positions={lastGadoLeite.localizacao?.coordenadas}
        >
          <Popup>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div>
                <Link to={`/GadoLeitePage/${lastGadoLeite.id}`} style={{ textDecoration: "none" }}>
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
                <strong>Piquete:</strong>
                <span>{lastGadoLeite.Piquete}</span>
              </div>
              <div>
                <strong>Área em Hectares: </strong>
                <span>{lastGadoLeite.area_ha}</span>
                <strong>Forrageira: </strong>
                <span>{lastGadoLeite.Forrageira}</span>
                <strong>Raça: </strong>
                <span>{lastGadoLeite.Raca}</span>
                <strong>Estágio: </strong>
                <span>{lastGadoLeite.Estagio}</span>
                <strong>Pastejo: </strong>
                <span>{lastGadoLeite.Pastejo}</span>
                <strong>Data de Colheita: </strong>
                <span>{lastGadoLeite.data_colheita}</span>
              </div>
            </div>
          </Popup>
        </Polygon>
      )}
    </>
  );
};

export default GadoLeitePolygons;
