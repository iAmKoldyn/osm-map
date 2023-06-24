import React, {useState} from 'react';

const Suggestions = ({suggestions, handleSuggestionClick, setSearchQuery}) => {

    return (
        <div className='ui__suggestions'>
            <ul className='search__suggestions-list'>
                {suggestions.map((suggestion, index) => (
                    <li
                        className='search__suggestions-item'
                        key={index}
                        onClick={() => {
                            setSearchQuery(suggestion);
                            handleSuggestionClick(suggestion);
                        }}
                    >
                        {suggestion}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Suggestions;