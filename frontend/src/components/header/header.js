import React from 'react';
import logo from "../../assets/images/SR_data_logoline_whi.svg";
import './index.css';

const Header = () => {
    return (
        <header>
            <div className='header__wrapper'>
                <div className='header__logo-block'>
                    <a className='header__logo-link' href=""><img src={logo} alt=""/></a>
                </div>

                <div className='header__btn-block'>
                    <button className='header__btn'>Загрузить снимок</button>
                    <button className='header__btn'>Слои</button>
                    <button className='header__btn'>Поделиться</button>
                </div>
            </div>
        </header>
    );
};

export default Header;