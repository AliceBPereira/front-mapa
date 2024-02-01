import React, { useEffect, useState } from "react";
import { Polygon, Popup } from "react-leaflet";
import { api } from "../../../lib/axios";
import { DetailsButton } from "../../details-button/details-button";
import { PopUpMark } from "../../popup-mark/popup-mark";
import { LabelData } from "../../label-data/label-data";

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
            <PopUpMark>
              <div>
                <DetailsButton url={`/CafePage/${cafe.id}`} />
              </div>
              <LabelData title="Talhão" content={cafe.talhao} />
              <LabelData title="Área em Hectares" content={cafe.area_ha} />
              <LabelData title="Espaçamento" content={cafe.espacament} />
              <LabelData title="Estande" content={cafe.estande} />
              <LabelData title="Numero de Plantas" content={cafe.n_de_plantas} />
              <LabelData title="Ano de Plantio" content={cafe.ano_plantio} />
              <div>
              </div>
            </PopUpMark>
          </Popup>
        </Polygon >
      ))}
    </>
  );
};

export default CafePolygons;
