import React, { useEffect, useState } from "react";
import { Polygon, Popup } from "react-leaflet";
import { api } from "../../lib/axios";

const greenOptions = { color: "orange" };

const GadoCortePolygon = () => {
  console.log(useState)

  const [gadosCorte, setGadosCorte] = useState([])
  const [loading, setLoading] = useState(false)

  const requestGadosCorte = async () => {
    setLoading(true)
    try {
      const response = await api.get('/gadosCorte')
      setGadosCorte(response.data.gadosCorte)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    requestGadosCorte()
  }, [])

  if(loading) {
    return <></>
  }
  return (
    <>
      { gadosCorte.map((gadoCorte) => {
        return (
          <Polygon pathOptions={greenOptions}  positions={gadoCorte.localizacao?.coordenadas}>
            <Popup>
              <div style={{
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div>
                  <strong>Nome do Pasto:</strong>
                  <span>{gadoCorte.Nome_pasto}</span>
                </div>
                <div>
                  <strong>Área em Hectares: </strong>
                  <span>{gadoCorte.area_ha}</span>
                  <strong>Forrageira: </strong>
                  <span>{gadoCorte.Forrageira}</span>
                  <strong>Raça: </strong>
                  <span>{gadoCorte.Raca}</span>
                  <strong>Pastejo: </strong>
                  <span>{gadoCorte.Pastejo}</span>
                </div>
              </div> 
            </Popup>
          </Polygon>
        )
      }) }    
    </>
  );
};



export default GadoCortePolygon;
