import React, {useEffect, useState} from 'react';
import axios from "axios";
import {ThreeDots} from "react-loader-spinner";
import {Rectangle} from "react-leaflet";

const LoadScreenModalPage = ({imageBounds, setImageBounds, btnIsClicked, setBtnIsClicked, mapRef}) => {
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (setUploading, setImageBounds, mapRef) => async (event) => {

        const file = event.target.files[0];

        // Check file extension
        const extension = file.name.split('.').pop().toLowerCase();
        if (extension !== 'tif') {
            console.error('Invalid file extension. Only .tif files are allowed.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        setUploading(true); // Start loading

        try {
            const response = await axios.post('http://localhost:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const { west, south, east, north } = response.data;
            console.log(`West: ${west}, South: ${south}, East: ${east}, North: ${north}`);
            setImageBounds([[south, west], [north, east]]);

            const centerLat = (south + north) / 2;
            const centerLng = (west + east) / 2;

            if (mapRef.current) {
                mapRef.current.flyTo([centerLat, centerLng], 15, { duration: 0.3 });
            }
        } catch (error) {
            console.error('Error uploading file: ', error);
        } finally {
            setUploading(false); // End loading
        }
    };

    useEffect(() => {
        console.log(imageBounds);
    }, [imageBounds]);

    return (
        <div>
            <input type="file" onChange={handleFileChange(setUploading, setImageBounds, mapRef)} onClick={() => setBtnIsClicked(false)} />
        </div>
    );
};

export default LoadScreenModalPage;