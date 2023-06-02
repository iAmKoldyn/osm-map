import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-graticule';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { useNavigate, useLocation } from 'react-router-dom';
import './index.css';

const Map = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [markers, setMarkers] = useState([]);
    const [labelPosition, setLabelPosition] = useState(null);
    const [showLabel, setShowLabel] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const savedMarkers = params.get('markers');
        if (savedMarkers) {
            setMarkers(JSON.parse(savedMarkers));
        }
    }, [location.search]);

    const MapEvents = () => {
        const map = useMapEvents({
            click: (e) => {
                const newMarker = e.latlng;
                setMarkers((oldMarkers) => {
                    const updatedMarkers = [...oldMarkers, newMarker];
                    navigate(`?markers=${JSON.stringify(updatedMarkers)}`);
                    return updatedMarkers;
                });
            },
            mousemove: (e) => {
                setLabelPosition(e.latlng);
            },
            dblclick: () => {
                setShowLabel(!showLabel);
            },
            map: {
                whenReady: (map) => {
                    L.latlngGraticule({
                        font: '12px Sans-Serif',
                        color: '#333',
                        opacity: 0.8,
                        showLabel: true,
                        zoomInterval: [
                            {start: 2, end: 3, interval: 30},
                            {start: 4, end: 4, interval: 10},
                            {start: 5, end: 7, interval: 5},
                            {start: 8, end: 10, interval: 1}
                        ]
                    }).addTo(map);
                }
            }
        });
        return null;
    };

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
                <Marker key={idx} position={position}>
                    {(showLabel && position === markers[markers.length - 1]) && (
                        <Popup>Lat: {position.lat}, Lng: {position.lng}</Popup>
                    )}
                </Marker>
            )}
            {labelPosition && showLabel && (
                <Marker position={labelPosition}>
                    <Popup>Lat: {labelPosition.lat}, Lng: {labelPosition.lng}</Popup>
                </Marker>
            )}
            <MapEvents />
        </MapContainer>
    );
};

export default Map;