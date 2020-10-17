import Leaflet from 'leaflet';
import mapMarkerImg from "../images/Marker.svg";

const mapIcon = Leaflet.icon({
    iconUrl: mapMarkerImg,
    iconSize: [48, 58],
    iconAnchor: [24, 45],
    popupAnchor: [170, 24],
});

export default mapIcon;