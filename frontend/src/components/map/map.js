import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-graticule';
import {MapContainer, Marker, Popup, useMapEvents, ZoomControl} from 'react-leaflet';
import { useNavigate, useLocation } from 'react-router-dom';
import './index.css';
import Layers from "./layers";
import markerIcon from '../../assets/images/marker-icon.png';
import markerIcon2X from '../../assets/images/marker-icon-2x.png';
import markerShadow from '../../assets/images/marker-shadow.png';

const Map = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [marker, setMarker] = useState(null);
    const [labelPosition, setLabelPosition] = useState(null);
    const [showLabel, setShowLabel] = useState(false);
    const [zoom, setZoom] = useState(0);
    const [center, setCenter] = useState([20, 15]);
    const mapRef = React.useRef(null);

    useEffect(() => {
        const hash = location.hash.replace('#', '');
        const parts = hash.split('/');
        if (parts.length === 3 && parts[0] === 'map') {
            setZoom(Number(parts[1]));
            setCenter([Number(parts[2]), Number(parts[3])]);
        }
    }, [location.hash]);

    const defaultMarkerIcon = new L.Icon({
        iconUrl: markerIcon,
        iconRetinaUrl: markerIcon2X,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowUrl: markerShadow,
        shadowSize: [41, 41],
        shadowAnchor: [12, 41],
    });

    L.Marker.prototype.options.icon = defaultMarkerIcon;

    const MapEvents = () => {
        const map = useMapEvents({
            click: (e) => {
                setMarker(e.latlng);
                navigate(`#map=${map.getZoom()}/${e.latlng.lat}/${e.latlng.lng}`);
            },
            mousemove: (e) => {
                setLabelPosition(e.latlng);
            },
            zoomend: () => {
                setZoom(map.getZoom());
                navigate(`#map=${map.getZoom()}/${center[0]}/${center[1]}`);
            },
            moveend: () => {
                setCenter([map.getCenter().lat, map.getCenter().lng]);
                navigate(`#map=${map.getZoom()}/${map.getCenter().lat}/${map.getCenter().lng}`);
            },
        });

        return null;
    };

    return (
        <MapContainer
            className="map-container"
            center={center}
            zoom={zoom}
            scrollWheelZoom={true}
            whenCreated={(mapInstance) => {
                mapRef.current = mapInstance;
            }}
        >
            <Layers />
            <ZoomControl position='topright'/>
            <MapEvents />
            {marker && (
                <Marker
                    position={marker}
                    eventHandlers={{
                        dblclick: () => {
                            setMarker(null);
                        },
                    }}
                >
                    <Popup>A pretty CSS3 popup. <br /> Easily customizable.</Popup>
                </Marker>
            )}
            {showLabel && labelPosition && (
                <Marker position={labelPosition}>
                    <Popup>{`${labelPosition.lat.toFixed(2)}, ${labelPosition.lng.toFixed(2)}`}</Popup>
                </Marker>
            )}
        </MapContainer>
    );
};

export default Map;
