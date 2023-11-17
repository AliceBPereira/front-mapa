import {
  MapContainer,
  TileLayer,
  LayersControl,
  LayerGroup,
} from "react-leaflet";
import "./map.css";

import LocalMarkers from "../../components/Markers/MarkerPredios";
import MilhoPolygons from "../../components/Poligonos/MilhoPoligono";
import CafePolygons from "../../components/Poligonos/CafePoligono";
import Gaveta from "../../components/Layout/Sidebar/gaveta";
import GadoLeitePolygons from "../../components/Poligonos/GadoLeitePolygon";
import CaprinoOvinoPolygon from "../../components/Poligonos/CaprinoOvinoPolygon";
import GadoCortePolygon from "../../components/Poligonos/GadoCortePolygon";
import CampusPolygon from "../../components/Poligonos/CampusPolygon";
import Header from "../../components/Layout/Header/header";



const { BaseLayer, Overlay } = LayersControl;

function Map() {
  return (
    
    <div className="map-container">
     
     
      <Gaveta/>
  

      <MapContainer center={[-21.3504826, -46.5282748]} zoom={16}>
        <TileLayer
          attribution='&copy; <a href="https://www.maptiler.com/">MapTiler</a> &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
        />
        <div className="leaflet-control-layers leaflet-control-layers-expanded">
          <LayersControl position="topright">
            <BaseLayer checked name="Mapa de Rua">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            </BaseLayer>
            <BaseLayer name="Mapa de Satélite">
              <TileLayer
                url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
                subdomains={["mt0", "mt1", "mt2", "mt3"]}
              />
            </BaseLayer>
            <Overlay name="Campus">
              <LayerGroup>
                <CampusPolygon />
              </LayerGroup>
            </Overlay>
            <Overlay name="Café">
              <LayerGroup>
                <CafePolygons />
              </LayerGroup>
            </Overlay>
            <Overlay name="Gado de Leite">
              <LayerGroup>
                <GadoLeitePolygons />
              </LayerGroup>
            </Overlay>
            <Overlay name="Gado de Corte">
              <LayerGroup>
                <GadoCortePolygon />
              </LayerGroup>
            </Overlay>
            <Overlay name="Caprino e Ovino">
              <LayerGroup>
                <CaprinoOvinoPolygon />
              </LayerGroup>
            </Overlay>
            <Overlay name="Prédios">
              <LayerGroup>
                <LocalMarkers />
              </LayerGroup>
            </Overlay>
            <Overlay name="Milho">
              <LayerGroup>
                <MilhoPolygons />
              </LayerGroup>
            </Overlay>
          </LayersControl>
        </div>
      </MapContainer>
    </div>
 
  );
}

export default Map;
