import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiPlus, FiArrowRight } from "react-icons/fi";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import mapIcon from "../utils/mapIcon";

import "../styles/pages/orphanages-map.css";
import MarkerImg from "../images/Marker.svg";
import api from "../services/api";

interface Orphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

const OrphanagesMap: React.FC = () => {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  const defaultCoords = {
    latitude: -13.2907639,
    longitude: -50.4697997,
  };

  const [userCoords, setUserCoords] = useState<Coordinates>({
    latitude: defaultCoords.latitude,
    longitude: defaultCoords.longitude,
    accuracy: 1,
    altitudeAccuracy: 0,
    altitude: 0,
    heading: 0,
    speed: 0,
  });

  useEffect(() => {
    api.get("/orphanages").then((response) => {
      setOrphanages(response.data);
    });

    navigator.geolocation.getCurrentPosition((position) => {
      setUserCoords(position.coords);
    });
  }, []);

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={MarkerImg} alt="Happy" />

          <h2>Escolha um orfanato no mapa</h2>

          <p>Muitas crianças estão esperando a sua visita</p>
        </header>

        <footer>
          <strong>São Paulo</strong>
          <span>São Paulo</span>
        </footer>
      </aside>

      <Map
        center={[userCoords.latitude, userCoords.longitude]}
        zoom={userCoords.latitude === defaultCoords.latitude ? 4 : 15}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {orphanages.map((orphanage) => {
          return (
            <Marker
              icon={mapIcon}
              position={[orphanage.latitude, orphanage.longitude]}
              key={orphanage.id}
            >
              <Popup
                closeButton={false}
                minWidth={240}
                maxWidth={240}
                className="map-popup"
              >
                {orphanage.name}
                <Link to={`orphanages/${orphanage.id}`}>
                  <FiArrowRight size={20} color="#FFF" />
                </Link>
              </Popup>
            </Marker>
          );
        })}
      </Map>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  );
};

export default OrphanagesMap;
