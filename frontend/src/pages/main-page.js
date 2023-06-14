import React, { useState } from 'react';
import Map from "../components/map/map";
import Header from "../components/header/header";
import Modal from "../components/modal/modal";
import AddLayersModalPage from "./add-layers-modal-page";
import LoadScreenModalPage from "./load-screen-modal-page";

const MainPage = () => {
    const mapRef = React.useRef(null);
    const [modalActive, setModalActive] = useState(false);
    const [btnModifier, setBtnModifier] = useState('');
    const [imageBounds, setImageBounds] = useState(null);
    let modalContent = null;

    switch (btnModifier){
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
            modalContent = <AddLayersModalPage btnIsClicked={modalActive} setBtnIsClicked={setModalActive}/>
            break;
    }

    return (
        <>
            <Header
                btnIsClicked={modalActive}
                setBtnIsClicked={setModalActive}
                btnModifier={btnModifier}
                setBtnModifier={setBtnModifier}
            />
            <Map imageBounds={imageBounds} setImageBounds={setImageBounds} mapRef={mapRef}/>
            <Modal active={modalActive} setActive={setModalActive}>
                {modalContent}
            </Modal>
        </>
    );
};

export default MainPage;