import axios from 'axios';
import L from 'leaflet';

export const searchForBoundaries = (query, mapRef, setSearchMarker, searchMarker) => {
    const encodedQuery = encodeURIComponent(query);
    console.log('Encoded Query: ', encodedQuery);

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
