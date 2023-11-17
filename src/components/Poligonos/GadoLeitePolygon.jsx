import React, { useEffect, useState } from "react";
import { Polygon, Popup } from "react-leaflet";
import { api } from "../../lib/axios";
import { Link } from "react-router-dom";

const greenOptions = { color: "black" };

const GadoLeitePolygons = () => {
  console.log(useState)

  const [gadosLeite, setGadosLeite] = useState([])
  const [loading, setLoading] = useState(false)

  const requestGadosLeite = async () => {
    setLoading(true)
    try {
      const response = await api.get('/gadosLeites')
      setGadosLeite(response.data.gadosLeite)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    requestGadosLeite()
  }, [])

  if(loading) {
    return <></>
  }
  return (
    <>
      { gadosLeite.map((gadoLeite) => {
        return (
          <Polygon key={gadoLeite.id} pathOptions={greenOptions}  positions={gadoLeite.localizacao?.coordenadas}>
            <Popup>
              <div style={{
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div>
                  <Link  to={`/GadoLeitePage/${gadoLeite.id}`} style={{ textDecoration: "none" }}>
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
                  <span>{gadoLeite.Piquete}</span>
                </div>
                <div>
                  <strong>Área em Hectares: </strong>
                  <span>{gadoLeite.area_ha}</span>
                  <strong>Forrageira: </strong>
                  <span>{gadoLeite.Forrageira}</span>
                  <strong>Raça: </strong>
                  <span>{gadoLeite.Raca}</span>
                  <strong>Estágio: </strong>
                  <span>{gadoLeite.Estagio}</span>
                  <strong>Pastejo: </strong>
                  <span>{gadoLeite.Pastejo}</span>
                </div>
              </div> 
            </Popup>
          </Polygon>
        )
      }) }    
    </>
  );
};


export default GadoLeitePolygons;
