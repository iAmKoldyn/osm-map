import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-graticule';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { useNavigate, useLocation } from 'react-router-dom';
import './index.css';

const MapEvents = ({ setMarkers, setShowLabel, setLabelPosition }) => {
    const navigate = useNavigate();
    const map = useMapEvents({
        click: (e) => {
            const newMarker = e.latlng;
            setMarkers((oldMarkers) => {
                if (oldMarkers.length > 0 && oldMarkers[0].lat === newMarker.lat && oldMarkers[0].lng === newMarker.lng) {
                    navigate(`#map=${map.getZoom()}`);
                    return [];
                } else {
                    navigate(`#map=${map.getZoom()}/${newMarker.lat}/${newMarker.lng}`);
                    return [newMarker];
                }
            });
        },
        mousemove: (e) => {
            setLabelPosition(e.latlng);
        },
        dblclick: () => {
            setShowLabel(showLabel => !showLabel);
        },
    });
    return null;
};

const MapMarker = ({ position, showLabel }) => (
    <Marker position={position}>
        {showLabel && (
            <Popup>Lat: {position.lat}, Lng: {position.lng}</Popup>
        )}
    </Marker>
);

const Map = () => {
    const location = useLocation();
    const [markers, setMarkers] = useState([]);
    const [labelPosition, setLabelPosition] = useState(null);
    const [showLabel, setShowLabel] = useState(false);

    useEffect(() => {
        const hash = location.hash.replace('#', '');
        const parts = hash.split('/');
        if (parts.length === 4 && parts[0] === 'map') {
            const zoom = Number(parts[1]);
            const lat = Number(parts[2]);
            const lng = Number(parts[3]);
            setMarkers(oldMarkers => [...oldMarkers, { lat, lng }]);
        }
    }, [location.hash]);

    return (
        <MapContainer
            className="map-container"
            center={[-46, -104]}
            zoom={0}
            scrollWheelZoom={true}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {markers.map((position, idx) =>
                <MapMarker key={idx} position={position} showLabel={showLabel && position === markers[markers.length - 1]} />
            )}
            {labelPosition && showLabel && (
                <MapMarker position={labelPosition} showLabel={true} />
            )}
            <MapEvents setMarkers={setMarkers} setShowLabel={setShowLabel} setLabelPosition={setLabelPosition} />
        </MapContainer>
    );
};

export default Map;
