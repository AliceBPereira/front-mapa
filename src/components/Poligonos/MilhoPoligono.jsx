import React, { useEffect, useState } from "react";
import { Polygon, Popup } from "react-leaflet";
import { MilhoInfo } from "../../Informations/MilhoInfo";
import { api } from "../../lib/axios";


const purpleOptions = { color: "purple" };

const MilhoPolygons = () => {
  console.log(useState)

  const [milhos, setMilhos] = useState([])
  const [loading, setLoading] = useState(false)

  const requestMilhos = async () => {
    setLoading(true)
    try {
      const response = await api.get('/milhos')
      setMilhos(response.data.milhos)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    requestMilhos()
  }, [])

  if(loading) {
    return <></>
  }
  return (
    <>
      { milhos.map((milho) => {
        return (
          <Polygon pathOptions={purpleOptions}  positions={milho.localizacao?.coordenadas}>
            <Popup>
              <div style={{
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div>
                  <strong>Talhão:</strong>
                  <span>{milho.talhao}</span>
                </div>
                <div>
                  <strong>Área em Hectares: </strong>
                  <span>{milho.area_ha}</span>
                  <strong>Espaçamento: </strong>
                  <span>{milho.espacament}</span>
                  <strong>Sistema de plantação: </strong>
                  <span>{milho.sist_plant}</span>
                  <strong>Sementes: </strong>
                  <span>{milho.sementes}</span>
                  <strong>Produção tha: </strong>
                  <span>{milho.prod_tha}</span>
                  <strong>Produção de 2020: </strong>
                  <span>{milho.prod_2020}</span>
                  <strong>Plantio de 2021: </strong>
                  <span>{milho.plantio_21}</span>
                  <strong>Plantio de 2020: </strong>
                  <span>{milho.plantio_20}</span>
                </div>
              </div> 
            </Popup>
          </Polygon>
        )
      }) }    
    </>
  );
};


export default MilhoPolygons;
