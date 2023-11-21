import React, { useEffect, useState } from "react";
import { Polygon, Popup } from "react-leaflet";
import { MilhoInfo } from "../Informations/MilhoInfo";
import { api } from "../../lib/axios";
import { Link } from "react-router-dom";

const purpleOptions = { color: "purple" };

const MilhoPolygons = () => {
  const [milhos, setMilhos] = useState([]);
  const [loading, setLoading] = useState(false);

  const requestMilhos = async () => {
    setLoading(true);
    try {
      const response = await api.get("/milhos");
      setMilhos(response.data.milhos);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    requestMilhos();
  }, []);

  if (loading) {
    return <></>;
  }

  // Sort milhos based on the registration date in descending order
  const sortedMilhos = milhos.sort((a, b) => new Date(b.data_cadastro) - new Date(a.data_cadastro));

  const lastTalhao = sortedMilhos[0]; // Get the first milho (last registered)

  return (
    <>
      {lastTalhao && (
        <Polygon
          key={lastTalhao.id}
          pathOptions={purpleOptions}
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
                <Link
                  to={`/MilhoPage/${lastTalhao.id}`}
                  style={{ textDecoration: "none" }}
                >
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
                <strong>Sistema de plantação: </strong>
                <span>{lastTalhao.sist_plant}</span>
                <strong>Sementes: </strong>
                <span>{lastTalhao.sementes}</span>
                <strong>Produção tha: </strong>
                <span>{lastTalhao.prod_tha}</span>
                <strong>Produção de 2020: </strong>
                <span>{lastTalhao.prod_2020}</span>
                <strong>Plantio de 2021: </strong>
                <span>{lastTalhao.plantio_21}</span>
                <strong>Plantio de 2020: </strong>
                <span>{lastTalhao.plantio_20}</span>
              </div>
            </div>
          </Popup>
        </Polygon>
      )}
    </>
  );
};

export default MilhoPolygons;
