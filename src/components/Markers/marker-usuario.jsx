// LocalMarkers.jsx
import React, { useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

import markerusuario from "../Icon/ponto.png";

import "./LocalMarkers.css"; 

const Iconlugar = new L.Icon({
  iconUrl: markerusuario,
  popupAnchor: [-0, -0],
  iconSize: [32, 32],
});

const UsuarioMarkers = () => {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        setUserLocation({ latitude, longitude, accuracy });
      },
      (error) => {
        console.error('Erro ao obter a localização:', error);
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);
  return (
    <>
      {userLocation && (
        <Marker key="userLocation" icon={Iconlugar} position={[userLocation.latitude, userLocation.longitude]}>
          <Popup>
            <div className="markerPopup">
              <div>
                <p>Localização do Usuário</p>
              </div>
              <div>
                <strong>Latitude:</strong>
                <span>{userLocation.latitude}</span>
              </div>
              <div>
                <strong>Longitude:</strong>
                <span>{userLocation.longitude}</span>
              </div>
            </div>
          </Popup>
        </Marker>
      )}
    </>
  );
};

export default UsuarioMarkers;
