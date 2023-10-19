import React, { useEffect, useState } from "react";
import { Polygon } from "react-leaflet";
import { CampusInfo } from "../../Informations/CampusInfo";
import { api } from "../../lib/axios";


const greenOptions = { color: "blue" };

const CampusPolygon = () => {
  console.log(useState)

  const [areaCampus, setareaCampus] = useState([])
  const [loading, setLoading] = useState(false)

  const requestareaCampus = async () => {
    setLoading(true)
    try {
      const response = await api.get('/areaCampus')
      setareaCampus(response.data.areaCampus)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    requestareaCampus()
  }, [])

  if(loading) {
    return <></>
  }

  return (
    <>
      { areaCampus.map((areaCampus) => {
        return (
          <Polygon pathOptions={greenOptions}  positions={areaCampus.localizacao?.coordenadas}>
            
          </Polygon>
        )
      }) }    
    </>
  );
};

export default CampusPolygon;
