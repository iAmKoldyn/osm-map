import { useEffect } from 'react';

const useGeolocation = (isLocating, setUserLocation, setLocationAccuracy, mapRef) => {
    useEffect(() => {
        let watchId;

        if (isLocating) {
            watchId = navigator.geolocation.watchPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation([latitude, longitude]);
                    setLocationAccuracy(position.coords.accuracy);

                    if (mapRef.current) {
                        mapRef.current.flyTo([latitude, longitude], 18, { duration: 1 });
                    }
                },
                (error) => {
                    console.error('Geolocation error:', error);
                }
            );
        } else {
            setUserLocation(null);
            setLocationAccuracy(null);
        }

        return () => {
            if (watchId) {
                navigator.geolocation.clearWatch(watchId);
            }
        };
    }, [isLocating, setUserLocation, setLocationAccuracy, mapRef]);
};

export default useGeolocation;
