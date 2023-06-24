import React from 'react';

const ModalButtons = ({setModalActive, setBtnModifier}) => {
    return (
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
    );
};

export default ModalButtons;