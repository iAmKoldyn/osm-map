import React from 'react';
import searchIcon from "../../assets/images/loopa-icon.png";

const Search = ({searchQuery, setSearchQuery, fetchSuggestions, handleSearch}) => {
    return (
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
    );
};

export default Search;