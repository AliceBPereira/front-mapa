import { LayersControl, MapContainer, Marker, TileLayer } from "react-leaflet"

import styles from './details-mini-map.styles.module.scss'

const { BaseLayer } = LayersControl;

export const DetailsMiniMapPredio = ({ coordinate}) => {
  return (
    <div className={styles.mapContainer}>
      <MapContainer center={coordinate[0]} zoom={24}>
        <TileLayer
          attribution='&copy; <a href="https://www.maptiler.com/">MapTiler</a> &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
        />
         <LayersControl position="topright" >
            <BaseLayer checked name="Mapa de Rua">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            </BaseLayer>
            <BaseLayer name="Mapa de Satélite">
              <TileLayer
                url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
                subdomains={["mt0", "mt1", "mt2", "mt3"]}
              />
            </BaseLayer>

            <Marker
              position={coordinate}
            >
          </Marker >
    
          </LayersControl>
       
      </MapContainer>
  </div>
  )
}