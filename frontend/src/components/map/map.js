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
            <TileLayer
                attribution='&copy; <a href "http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
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
