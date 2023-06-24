import axios from 'axios';
import L from 'leaflet';
import markerIcon from "../../assets/images/marker-icon.png";
import markerIcon2X from "../../assets/images/marker-icon-2x.png";
import markerShadow from "../../assets/images/marker-shadow.png";

export const searchForBoundaries = (query, mapRef, setSearchMarker, searchMarker) => {
    const encodedQuery = encodeURIComponent(query);
    console.log('Encoded Query: ', encodedQuery);

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

    axios
        .get(`https://nominatim.openstreetmap.org/search?q=${encodedQuery}&format=json`)
        .then((response) => {
            if (response.data && response.data.length > 0) {
                const { lat, lon, boundingbox } = response.data[0];
                const bounds = [
                    [boundingbox[0], boundingbox[2]],
                    [boundingbox[1], boundingbox[3]]
                ];
                if (mapRef.current) {
                    mapRef.current.flyToBounds(bounds, { duration: 0.3 });

                    // If there is an existing searchMarker, remove it
                    if (searchMarker) {
                        mapRef.current.removeLayer(searchMarker);
                    }

                    const marker = L.marker([lat, lon]).addTo(mapRef.current);
                    marker.bindPopup(query);
                    setSearchMarker(marker);
                }
            } else {
                console.log('No results found.');
            }
        })
        .catch((error) => {
            console.error('Error searching for boundaries: ', error);
        });
};
