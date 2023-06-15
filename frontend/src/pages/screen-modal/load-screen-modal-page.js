import React, {useEffect, useState} from 'react';
import axios from "axios";
import './index.css';

const LoadScreenModalPage = ({imageBounds, setImageBounds, btnIsClicked, setBtnIsClicked, mapRef}) => {
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (setUploading, setImageBounds, mapRef) => async (event) => {

        if (!event.target.files[0]) {
            console.error('No file selected');
            return;
        }

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
        <div className="load-screen__content">
            <h3 className='load-screen__title'>Загрузка снимка</h3>
            <p className='load-screen__description'>
                Чтобы загрузить снимок, кликните на кнопку "Выберите файл". <br/>После чего выберите снимок,
                который хотите отобразить на карте. <br/>
                <strong>Важно: Снимок должен иметь формат .tiff</strong>
            </p>
            <div className='load-screen__input-form'>
                <input className='load-screen__input' type="file" onChange={handleFileChange(setUploading, setImageBounds, mapRef)} onClick={() => setBtnIsClicked(false)} />
            </div>
        </div>
    );
};

export default LoadScreenModalPage;