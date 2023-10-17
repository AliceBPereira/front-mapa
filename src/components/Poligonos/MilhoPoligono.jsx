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
                  <strong>TALHÃO:</strong>
                  <span>{milho.talhao}</span>
                </div>
                <div>
                  <strong>ÁREA EM HECTARES: </strong>
                  <span>{milho.area_ha}</span>
                  <strong>espacament: </strong>
                  <span>{milho.espacament}</span>
                  <strong>sist_plant: </strong>
                  <span>{milho.sist_plant}</span>
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
