import React, { useState } from 'react';
import Map from "../components/map/map";
import Modal from "../components/modal/modal";
import AddLayersModalPage from "./layers-modal/add-layers-modal-page";
import LoadScreenModalPage from "./screen-modal/load-screen-modal-page";
import { searchForBoundaries } from '../components/map/osmSearch';
import axios from "axios";
import useGeolocation from "../components/map/useGeolocation";
import './index.css'
import Search from "../components/UI/search";
import Suggestions from "../components/UI/suggestions";
import ModalButtons from "../components/UI/modal-buttons";
import Geolocation from "../components/UI/geolocation";

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
                <Search
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    fetchSuggestions={fetchSuggestions}
                    handleSearch={handleSearch}
                />

                {showList && (
                    <Suggestions
                        suggestions={suggestions}
                        handleSuggestionClick={handleSuggestionClick}
                        setSearchQuery={setSearchQuery}
                    />
                )}

                {searchMarker && (
                    <div className="ui__search-marker-block">
                        <button className='ui__search-marker-delete' onClick={removeSearchMarker}>Удалить маркер поиска</button>
                    </div>
                )}

                <ModalButtons
                    setModalActive={setModalActive}
                    setBtnModifier={setBtnModifier}
                />


                <Geolocation
                    isLocating={isLocating}
                    setIsLocating={setIsLocating}
                />
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
