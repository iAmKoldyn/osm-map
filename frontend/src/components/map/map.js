import React, {useState, useEffect} from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-graticule';
import {MapContainer, Popup, useMapEvents, ZoomControl, Rectangle} from 'react-leaflet';
import {useNavigate, useLocation} from 'react-router-dom';
import './index.css';
import Layers from './layers';
import SRMarker from "./marker";


const Map = ({imageBounds, mapRef, userLocation}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [marker, setMarker] = useState(null);
    const [labelPosition, setLabelPosition] = useState(null);
    const [showLabel, setShowLabel] = useState(false);


    const parseUrlParams = () => {
        const params = new URLSearchParams(location.search);
        const mapParam = params.get('map');
        if (mapParam) {
            const [altitude, latitude, longitude] = mapParam.split('/');
            return {
                zoom: parseInt(altitude),
                center: [parseFloat(latitude), parseFloat(longitude)]
            };
        }
        return {
            zoom: 0,
            center: [20, 15]
        };
    };

    const {zoom: initialZoom, center: initialCenter} = parseUrlParams();
    const [zoom, setZoom] = useState(initialZoom);
    const [center, setCenter] = useState(initialCenter);

    useEffect(() => {
        const {zoom, center} = parseUrlParams();
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
            }
        });

        useEffect(() => {
            mapRef.current = map;
        }, [map]);

        return null;
    };

    const bounds = [
        [Infinity, -Infinity],
        [-Infinity, Infinity],
    ];

    return (
        <div className='map-wrapper'>
            <MapContainer
                className="map-container"
                center={center}
                minZoom={3}
                zoom={zoom}
                scrollWheelZoom={true}
                doubleClickZoom={false}
                maxBounds={bounds}
                maxBoundsViscosity={1.0}
            >
                <Layers/>
                <ZoomControl position="topright"/>
                <MapEvents/>
                {marker && (
                    <SRMarker marker={marker} setMarker={setMarker} mapRef={mapRef} position={marker}/>
                )}

                {showLabel && labelPosition && (
                    <SRMarker position={labelPosition}>
                        <Popup>{`${labelPosition.lat.toFixed(2)}, ${labelPosition.lng.toFixed(2)}`}</Popup>
                    </SRMarker>
                )}

                {imageBounds && <Rectangle bounds={imageBounds} color="#ff7800" weight={1}/>}

                {userLocation && (
                    <SRMarker marker={userLocation} position={userLocation} />)}
            </MapContainer>
        </div>
    );
};

export default Map;
