import React from "react";
import { useHistory } from "react-router-dom";

import mapMarkerImg from "../images/Marker.svg";
import { FiArrowLeft } from "react-icons/fi";

import "../styles/components/Sidebar.css";

const Sidebar: React.FC = () => {
  const { goBack } = useHistory();

  return (
    <aside className="app-sidebar">
      <img src={mapMarkerImg} alt="Happy" />

      <footer>
        <button type="button" onClick={goBack}>
          <FiArrowLeft size={24} color="#FFF" />
        </button>
      </footer>
    </aside>
  );
};

export default Sidebar;
