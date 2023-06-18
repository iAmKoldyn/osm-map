import React, {useState} from 'react';
import './index.css'
import {layers} from "../../__data__";

const AddLayersModalPage = ({btnIsClicked, setBtnIsClicked}) => {
    const [nameValue, setNameValue] = useState('');
    const [urlValue, setUrlValue] = useState('');
    const [atrValue, setAtrValue] = useState('');
    const [errors, setErrors] = useState({name: '', url: '', atr: ''});

    const validate = () => {
        let tempErrors = {name: '', url: '', atr: ''};
        let formIsValid = true;

        if (!nameValue || nameValue.length < 3 || nameValue.length > 10 || !/^[A-Za-z]+$/.test(nameValue)) {
            formIsValid = false;
            tempErrors.name = "Name must be between 3 to 10 characters, non-empty and only contain uppercase and lowercase letters";
        }

        if (!atrValue || atrValue.length < 2 || atrValue.length > 30 || !/^[A-Za-z]+$/.test(atrValue)) {
            formIsValid = false;
            tempErrors.atr = "Attribution must be between 2 to 30 characters, non-empty and only contain uppercase and lowercase letters";
        }

        if (!urlValue || !/^(https?:\/\/)[^\s$.?#].[^\s]*$/.test(urlValue)) {
            formIsValid = false;
            tempErrors.url = "URL must be non-empty and must be a valid URL";
        }

        setErrors(tempErrors);
        return formIsValid;
    };

    const handleClick = () => {
        if (validate()) {
            const newLayer = {name: nameValue, attribution: atrValue, url: urlValue, checked: false};
            layers.push(newLayer);
            setBtnIsClicked(false);
            setNameValue('');
            setUrlValue('');
            setAtrValue('');
        }
    }

    return (
        <div className='add-layers__wrapper'>
            <h3 className='add-layers__title'>Добавление слоя</h3>
            <p className='add-layers__description'>
                Для добавления слоя вам потребуется дать ему название <strong>(может быть любым)</strong>
                , а также указать url и attribution слоя.
            </p>
            <form className='add-layers__form' action="">
                <input
                    className='add-layers__input'
                    type="text"
                    value={nameValue}
                    onChange={event => setNameValue(event.target.value)}
                    placeholder='Введите название слоя'
                />
                {errors.name && <div className="error">{errors.name}</div>}
                <input
                    className='add-layers__input'
                    type="text"
                    value={atrValue}
                    onChange={event => setAtrValue(event.target.value)}
                    placeholder='Введите attribution слоя'
                />
                {errors.atr && <div className="error">{errors.atr}</div>}
                <input
                    className='add-layers__input'
                    type="text"
                    value={urlValue}
                    onChange={event => setUrlValue(event.target.value)}
                    placeholder='Введите url слоя'
                    />
                {errors.url && <div className="error">{errors.url}</div>}
            </form>
            <button className='add-layers__btn' onClick={handleClick}>Добавить</button>
        </div>
    );
};

export default AddLayersModalPage;
