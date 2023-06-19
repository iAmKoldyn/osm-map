import React, {useContext, useState} from 'react';
import {LayersControl, TileLayer} from "react-leaflet";
import {layersContext} from "../../contex";

const Layers = () => {
    const {layers} = useContext(layersContext);

    const handleMouseEnter = (event) => {
        event.target.expand();
    };

    return (
        <>
            <LayersControl position="topright" onMouseEnter={handleMouseEnter}>
                {layers.map((layer) => (
                    <LayersControl.BaseLayer checked={layer.checked} name={layer.name} key={layer.name}>
                        <TileLayer
                            attribution={layer.attribution}
                            url={layer.url}
                        />
                    </LayersControl.BaseLayer>
                ))}
            </LayersControl>
        </>
    );
};

export default Layers;
