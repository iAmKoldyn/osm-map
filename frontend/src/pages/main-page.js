import React, {useState} from 'react';
import Map from "../components/map/map";
import Header from "../components/header/header";
import Modal from "../components/modal/modal";
import AddLayersModalPage from "./add-layers-modal-page";
import LoadScreenModalPage from "./load-screen-modal-page";

const MainPage = () => {
    const [modalActive, setModalActive] = useState(false);
    const [btnModifier, setBtnModifier] = useState('');
    let modalContent = null;

    switch (btnModifier){
        case ('load-screen'):
            modalContent = <LoadScreenModalPage />
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
            <Map/>
            <Modal active={modalActive} setActive={setModalActive}>
                {modalContent}
            </Modal>
        </>
    );
};

export default MainPage;