import React, { useEffect, useState } from "react";
import { Polygon, Popup } from "react-leaflet";
import { api } from "../../lib/axios";
import { DetailsButton } from "../details-button/details-button";
import { PopUpMark } from "../popup-mark/popup-mark";

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
            <PopUpMark>
              <div>
                <DetailsButton url={`/MilhoPage/${lastTalhao.id}`} />
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
                <strong>Quantidade Colhida: </strong>
                <span>{lastTalhao.quantidade_colhida}</span>
                <strong>Periodo de plantação: </strong>
                <span>{lastTalhao.periodo}</span>
              </div>
            </PopUpMark>
          </Popup>
        </Polygon>
      )}
    </>
  );
};

export default MilhoPolygons;
