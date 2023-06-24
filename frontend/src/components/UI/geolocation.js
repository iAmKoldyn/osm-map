import React from 'react';

const Geolocation = ({isLocating, setIsLocating}) => {
    return (
        <div className="ui__geo-block geo">
            <button className='geo_button' onClick={() => setIsLocating(!isLocating)}>
                {isLocating ? 'Скрыть текущее местоположение' : 'Показать текущее местоположение'}
            </button>
        </div>
    );
};

export default Geolocation;