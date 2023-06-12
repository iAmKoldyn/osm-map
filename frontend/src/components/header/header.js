import React from 'react';
import logo from "../../assets/images/SR_data_logoline_whi.svg";
import './index.css';
import {Link} from "react-router-dom";

const Header = ({btnIsClicked, setBtnIsClicked, btnModifier, setBtnModifier}) => {
    return (
        <header>
            <div className='header__wrapper'>
                <div className='header__logo-block'>
                    <Link className='header__logo-link' to='/'><img src={logo}/></Link>
                </div>

                <div className='header__btn-block'>
                    <button className='header__btn' onClick={() => {
                        setBtnIsClicked(true);
                        setBtnModifier('load-screen');
                    }}>
                        Загрузить снимок
                    </button>
                    <button className='header__btn' onClick={() => {
                        setBtnIsClicked(true);
                        setBtnModifier('add-layer');
                    }}>
                        Добавить слой
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;