import React, { useEffect, useState } from "react";
import { Polygon, Popup } from "react-leaflet";

import { coffePolygon } from "../../Informations/coffePolygon";
import { api } from "../../lib/axios";

const greenOptions = { color: "green" };

const CafePolygons = () => {
  console.log(useState)

  const [cafes, setCafes] = useState([])
  const [loading, setLoading] = useState(false)

  const requestCafes = async () => {
    setLoading(true)
    try {
      const response = await api.get('/cafes')
      setCafes(response.data.cafes)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    requestCafes()
  }, [])

  if(loading) {
    return <></>
  }

  return (
    <>
      { cafes.map((coffee) => {
        return (
          <Polygon pathOptions={greenOptions}  positions={coffee.localizacao?.coordenadas}>
            <Popup>
              <div style={{
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div>
                  <strong>Talhão:</strong>
                  <span>{coffee.talhao}</span>
                </div>
                <div>
                  <strong>Área em Hectares: </strong>
                  <span>{coffee.area_ha}</span>
                  <strong>Espaçamento: </strong>
                  <span>{coffee.espacament}</span>
                  <strong>Estande: </strong>
                  <span>{coffee.estande}</span>
                  <strong>Numero de Plantas: </strong>
                  <span>{coffee.n_de_plantas}</span>
                  <strong>Ano de Plantio: </strong>
                  <span>{coffee.ano_plantio}</span>
                </div>
              </div> 
            </Popup>
          </Polygon>
        )
      }) }    
    </>
  );
};

export default CafePolygons;
