import React, { useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import markeredificios from "../../icones.png/pino-de-localizacao.png";
import { api } from "../../lib/axios";

const Iconlugar = new L.Icon({
  iconUrl: markeredificios,
  iconRetinaUrl: markeredificios,
  popupAnchor: [-0, -0],
  iconSize: [32, 32],
});

const LocalMarkers = () => {
  console.log(useState)

  const [predios, setPredios] = useState([])
  const [loading, setLoading] = useState(false)

  const requestPredios = async () => {
    setLoading(true)
    try {
      const response = await api.get('/predios')
      setPredios(response.data.predios)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    requestPredios()
  }, [])

  if(loading) {
    return <></>
  }

  return (
    <>
      { predios.map((predio) => {
        return (
          <Marker icon={Iconlugar}  position={predio.localizacao}>
            <Popup>
              <div style={{
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div>
                  <strong>Predio:</strong>
                  <span>{predio.nome}</span>
                </div>
                <div>
                  <strong>Área em Hectares: </strong>
                  <span>{predio.area_ha}</span>
    
                </div>
              </div> 
            </Popup>
          </Marker>
        )
      }) }    
    </>
  );
};


export default LocalMarkers;
