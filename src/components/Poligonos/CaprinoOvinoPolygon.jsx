import React, { useEffect, useState } from "react";
import { Polygon, Popup } from "react-leaflet";
import { api } from "../../lib/axios";
import { Link } from "react-router-dom";
const greenOptions = { color: "green" };

const CaprinoOvinoPolygon = () => {
  console.log(useState)

  const [caprinoOvinos, setCaprinoOvinos] = useState([])
  const [loading, setLoading] = useState(false)

  const requestCaprinoOvinos = async () => {
    setLoading(true)
    try {
      const response = await api.get('/caprinoOvinos')
      setCaprinoOvinos(response.data.caprinoOvinos)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    requestCaprinoOvinos()
  }, [])

  if(loading) {
    return <></>
  }
  return (
    <>
      { caprinoOvinos.map((caprinoOvino) => {
        return (
          <Polygon key={caprinoOvino.id}pathOptions={greenOptions}  positions={caprinoOvino.localizacao?.coordenadas}>
            <Popup>
              <div style={{
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div>
                  <Link  to={`/CaprinoOvinoPage/${caprinoOvino.id}`} style={{ textDecoration: "none" }}>
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
                  <span>{caprinoOvino.talhao}</span>
                </div>
                <div>
                  <strong>Árae em Hectares: </strong>
                  <span>{caprinoOvino.area_ha}</span>
                </div>
              </div> 
            </Popup>
          </Polygon>
        )
      }) }    
    </>
  );
};


export default CaprinoOvinoPolygon;
