import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-graticule';
import { MapContainer, Marker, Popup, useMapEvents, ZoomControl } from 'react-leaflet';
import { useNavigate, useLocation } from 'react-router-dom';
import './index.css';
import Layers from "./layers";
import markerIcon from '../../assets/images/marker-icon.png';
import markerIcon2X from '../../assets/images/marker-icon-2x.png';
import markerShadow from '../../assets/images/marker-shadow.png';
import ShareLocationButton from "./share-location-button";

const Map = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [marker, setMarker] = useState(null);
    const [labelPosition, setLabelPosition] = useState(null);
    const [showLabel, setShowLabel] = useState(false);
    const mapRef = React.useRef(null);

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

    const parseUrlParams = () => {
        const params = new URLSearchParams(location.search);
        const mapParam = params.get('map');
        if (mapParam) {
            const [altitude, latitude, longitude] = mapParam.split('/');
            return {
                zoom: parseInt(altitude),
                center: [parseFloat(latitude), parseFloat(longitude)],
            };
        }
        return {
            zoom: 0,
            center: [20, 15],
        };
    };

    const { zoom: initialZoom, center: initialCenter } = parseUrlParams();
    const [zoom, setZoom] = useState(initialZoom);
    const [center, setCenter] = useState(initialCenter);

    useEffect(() => {
        const { zoom, center } = parseUrlParams();
        setZoom(zoom);
        setCenter(center);
    }, [location]);

    const MapEvents = () => {
        const map = useMapEvents({
            click: (e) => {
                setMarker(e.latlng);
                navigate(`?map=${zoom}/${e.latlng.lat}/${e.latlng.lng}`);
            },
            mousemove: (e) => {
                setLabelPosition(e.latlng);
            },
            zoomend: () => {
                setZoom(map.getZoom());
                navigate(`?map=${map.getZoom()}/${center[0]}/${center[1]}`);
            },
            moveend: () => {
                setCenter([map.getCenter().lat, map.getCenter().lng]);
                navigate(`?map=${map.getZoom()}/${map.getCenter().lat}/${map.getCenter().lng}`);
            },
        });

        useEffect(() => {
            mapRef.current = map;
        }, [map]);

        return null;
    };

return (
    <MapContainer
        className="map-container"
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
    >
        <Layers />
        <ZoomControl position='topright' />
        <MapEvents />
        {marker && (
            <Marker
                position={marker}
                draggable={true}
                eventHandlers={{
                    drag: (e) => {
                        const newMarker = e.target;
                        setMarker(newMarker.getLatLng());
                        if (mapRef.current) {
                            navigate(`?map=${mapRef.current.getZoom()}/${newMarker.getLatLng().lat}/${newMarker.getLatLng().lng}`);
                        }
                    },
                    dragend: (e) => {
                        const newMarker = e.target;
                        setMarker(newMarker.getLatLng());
                        if (mapRef.current) {
                            navigate(`?map=${mapRef.current.getZoom()}/${newMarker.getLatLng().lat}/${newMarker.getLatLng().lng}`);
                        }
                    },
                    dblclick: () => {
                        setMarker(null);
                    },
                }}
            >
                <Popup>Lat: {marker.lat} <br /> Lng: {marker.lng} <br />
                    <ShareLocationButton />
                </Popup>
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