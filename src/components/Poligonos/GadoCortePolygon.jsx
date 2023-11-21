import React, { useEffect, useState } from "react";
import { Polygon, Popup } from "react-leaflet";
import { api } from "../../lib/axios";
import { Link } from "react-router-dom";

const orangeOptions = { color: "orange" };

const GadoCortePolygon = () => {
  const [gadosCorte, setGadosCorte] = useState([]);
  const [loading, setLoading] = useState(false);

  const requestGadosCorte = async () => {
    setLoading(true);
    try {
      const response = await api.get("/gadosCorte");
      setGadosCorte(response.data.gadosCorte);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    requestGadosCorte();
  }, []);

  if (loading) {
    return <></>;
  }

  // Sort gadosCorte based on the harvest date in descending order
  const sortedGadosCorte = gadosCorte.sort((a, b) => new Date(b.data_colheita) - new Date(a.data_colheita));

  const lastGadoCorte = sortedGadosCorte[0]; // Get the first gadoCorte (last harvested)

  return (
    <>
      {lastGadoCorte && (
        <Polygon
          key={lastGadoCorte.id}
          pathOptions={orangeOptions}
          positions={lastGadoCorte.localizacao?.coordenadas}
        >
          <Popup>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div>
                <Link to={`/GadoCortePage/${lastGadoCorte.id}`} style={{ textDecoration: "none" }}>
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
                <strong>Nome do Pasto:</strong>
                <span>{lastGadoCorte.Nome_pasto}</span>
              </div>
              <div>
                <strong>Área em Hectares: </strong>
                <span>{lastGadoCorte.area_ha}</span>
                <strong>Forrageira: </strong>
                <span>{lastGadoCorte.Forrageira}</span>
                <strong>Raça: </strong>
                <span>{lastGadoCorte.Raca}</span>
                <strong>Pastejo: </strong>
                <span>{lastGadoCorte.Pastejo}</span>
                <strong>Data de Colheita: </strong>
                <span>{lastGadoCorte.data_colheita}</span>
              </div>
            </div>
          </Popup>
        </Polygon>
      )}
    </>
  );
};

export default GadoCortePolygon;
