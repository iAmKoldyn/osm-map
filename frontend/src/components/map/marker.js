import React from 'react';
import {useNavigate} from "react-router-dom";
import {Marker, Popup} from "react-leaflet";
import ShareLocationButton from "./share-location-button";
import L from "leaflet";
import markerIcon from "../../assets/images/marker-icon.png";
import markerIcon2X from "../../assets/images/marker-icon-2x.png";
import markerShadow from "../../assets/images/marker-shadow.png";

const SRMarker = ({marker, setMarker, mapRef, position}) => {
    const navigate = useNavigate();

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

    return (
        <Marker
            position={position}
            draggable={true}
            eventHandlers={{
                drag: (e) => {
                    const newMarker = e.target;
                    setMarker(newMarker.getLatLng());
                    if (mapRef.current) {
                        navigate(
                            `?map=${mapRef.current.getZoom()}/${newMarker.getLatLng().lat}/${newMarker.getLatLng().lng}`
                        );
                    }
                },
                dragend: (e) => {
                    const newMarker = e.target;
                    setMarker(newMarker.getLatLng());
                    if (mapRef.current) {
                        navigate(
                            `?map=${mapRef.current.getZoom()}/${newMarker.getLatLng().lat}/${newMarker.getLatLng().lng}`
                        );
                    }
                },
                dblclick: () => {
                    setMarker(null);
                }
            }}
        >
            <Popup>
                Lat: {marker.lat} <br/> Lng: {marker.lng} <br/>
                <ShareLocationButton/>
            </Popup>
        </Marker>
    );
};

export default SRMarker;