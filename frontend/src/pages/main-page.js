import React, { useState } from 'react';
import Map from "../components/map/map";
import Modal from "../components/modal/modal";
import AddLayersModalPage from "./layers-modal/add-layers-modal-page";
import LoadScreenModalPage from "./screen-modal/load-screen-modal-page";
import { searchForBoundaries } from '../components/map/osmSearch';
import axios from "axios";
import useGeolocation from "../components/map/useGeolocation";
import searchIcon from './../assets/images/loopa-icon.png';
import './index.css'

const MainPage = () => {
    const mapRef = React.useRef(null);
    const [modalActive, setModalActive] = useState(false);
    const [btnModifier, setBtnModifier] = useState('');
    const [imageBounds, setImageBounds] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchMarker, setSearchMarker] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const [userLocation, setUserLocation] = useState(null);
    const [locationAccuracy, setLocationAccuracy] = useState(null);
    const [isLocating, setIsLocating] = useState(false);
    const [showList, setShowList] = useState(false);
    let modalContent = null;

    useGeolocation(isLocating, setUserLocation, setLocationAccuracy, mapRef);

    switch (btnModifier) {
        case ('load-screen'):
            modalContent = <LoadScreenModalPage
                imageBounds={imageBounds}
                setImageBounds={setImageBounds}
                btnIsClicked={modalActive}
                setBtnIsClicked={setModalActive}
                mapRef={mapRef}
            />
            break;
        case ('add-layer'):
            modalContent = <AddLayersModalPage btnIsClicked={modalActive} setBtnIsClicked={setModalActive} />
            break;
    }

    const fetchSuggestions = async (query) => {
        if (query.trim() !== '') {
            try {
                const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${process.env.REACT_APP_API_KEY}`);
                if (response.data && response.data.results) {
                    setSuggestions(response.data.results.map(result => result.formatted));
                    setShowList(true);
                }
            } catch (error) {
                console.error('Error fetching suggestions: ', error);
            }
        } else {
            setSuggestions([]);
            setShowList(false);
        }
    };

    const handleSearch = () => {
        setShowList(false);
        if (searchQuery.trim() !== '') {
            searchForBoundaries(searchQuery, mapRef, setSearchMarker, searchMarker);
        }
    };

    const removeSearchMarker = () => {
        if (searchMarker) {
            mapRef.current.removeLayer(searchMarker);
            setSearchMarker(null);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        searchForBoundaries(suggestion, mapRef, setSearchMarker, searchMarker);
        setShowList(false);
    };

    return (
        <>
            <div className="ui__wrapper">
                <div className="ui__search search">
                    <div className='search__input-wrapper'>
                        <img className='search__icon' src={searchIcon} alt="" />
                        <input
                            className='search__input'
                            type="text"
                            placeholder='Введите адрес'
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                fetchSuggestions(e.target.value);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSearch();
                                }
                            }}
                        />
                        <button className='search__btn' onClick={handleSearch}>Найти</button>
                    </div>
                </div>

                {showList && (
                    <div className='ui__suggestions'>
                        <ul className='search__suggestions-list'>
                            {suggestions.map((suggestion, index) => (
                                <li
                                    className='search__suggestions-item'
                                    key={index}
                                    onClick={() => {
                                        setSearchQuery(suggestion);
                                        handleSearch();
                                    }}
                                >
                                    {suggestion}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {searchMarker && (
                    <div className="ui__search-marker-block">
                        <button className='ui__search-marker-delete' onClick={removeSearchMarker}>Удалить маркер поиска</button>
                    </div>
                )}

                <div className="ui__modal-buttons modal-buttons">
                    <button className='modal-buttons__btn' onClick={() => {
                        setModalActive(true);
                        setBtnModifier('load-screen');
                    }}>
                        Загрузить снимок
                    </button>
                    <button className='modal-buttons__btn' onClick={() => {
                        setModalActive(true);
                        setBtnModifier('add-layer');
                    }}>
                        Добавить слой
                    </button>
                </div>


                <div className="ui__geo-block geo">
                    <button className='geo_button' onClick={() => setIsLocating(!isLocating)}>
                        {isLocating ? 'Скрыть текущее местоположение' : 'Показать текущее местоположение'}
                    </button>
                </div>
            </div>
            <Map
                imageBounds={imageBounds}
                setImageBounds={setImageBounds}
                mapRef={mapRef}
                userLocation={userLocation}
                locationAccuracy={locationAccuracy}
            />
            <Modal active={modalActive} setActive={setModalActive}>
                {modalContent}
            </Modal>
        </>
    );
};

export default MainPage;
