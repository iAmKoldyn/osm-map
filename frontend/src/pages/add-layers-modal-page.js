import React, {useState} from 'react';
import './index.css'
import {layers} from "../__data__";

const AddLayersModalPage = ({btnIsClicked, setBtnIsClicked}) => {
    const [nameValue, setNameValue] = useState();
    const [urlValue, setUrlValue] = useState();
    const [atrValue, setAtrValue] = useState();

    const handleClick = () => {
        const newLayer = {name: nameValue, attribution: atrValue, url: urlValue, checked: false};
        layers.push(newLayer);
        setBtnIsClicked(false);
        setNameValue('');
        setUrlValue('');
        setAtrValue('');
    }

    return (
        <div className='add-layers__wrapper'>
            <h2>Добавление слоя</h2>
            <form className='add-layers__form' action="">
                <input
                    className='add-layers__input'
                    type="text"
                    onChange={event => setNameValue(event.target.value)}
                    placeholder='Введите название слоя'
                />
                <input
                    className='add-layers__input'
                    type="text"
                    onChange={event => setUrlValue(event.target.value)}
                    placeholder='Введите url слоя'
                />
                <input
                    className='add-layers__input'
                    type="text"
                    onChange={event => setAtrValue(event.target.value)}
                    placeholder='Введите attribution слоя'
                />
            </form>
            <button className='add-layers__btn' onClick={handleClick}>Добавить</button>
        </div>
    );
};

export default AddLayersModalPage;