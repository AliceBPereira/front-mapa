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
                  <strong>TALHÃO:</strong>
                  <span>{coffee.talhao}</span>
                </div>
                <div>
                  <strong>ÁREA EM HECTARES: </strong>
                  <span>{coffee.area_ha}</span>
                  <strong>espacament: </strong>
                  <span>{coffee.espacament}</span>
                  <strong>estande: </strong>
                  <span>{coffee.estande}</span>
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
