import React, { useEffect } from 'react';
import axios from "axios";

const LoadScreenModalPage = ({imageBounds, setImageBounds, btnIsClicked, setBtnIsClicked}) => {
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        const response = await axios.post('http://localhost:5000/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            const {west, south, east, north} = response.data;
            console.log(`West: ${west}, South: ${south}, East: ${east}, North: ${north}`); // Log the coordinates to the console
            setImageBounds([[west, south], [east, north]]);
        }).catch(error => {
            console.error("Error uploading file: ", error);
        });
    }

    useEffect(() => {
        console.log(imageBounds);
    }, [imageBounds]);

    return (
        <div>
            <input type="file" onChange={handleFileChange} onClick={() => setBtnIsClicked(false)} />
        </div>
    );
};

export default LoadScreenModalPage;