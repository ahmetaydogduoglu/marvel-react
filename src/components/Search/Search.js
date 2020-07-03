import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa';
//componenst
import Input from "../Input"
//local files
import "./Search.css"


function Search({ setFilterActive, onFilter, charactersLength, searchBoxObject }) {
    const [searchText, setSearchText] = useState("");
    const inputConfig = {
        placeholder: "search character",
        value: searchText,
        name: "search",
        disabled: charactersLength === 0 ? true : false,
        onChange: e => {
            searchBoxObject.setObservable(e.target.value);
            setSearchText(e.target.value);
            if (searchText.trim().length > 2) {
                setFilterActive(true);
                searchBoxObject.setFilterActive(true);
            }
            if (searchText.trim().length < 2) {
                searchBoxObject.setFilterActive(false);
            }
        }
    }
    return (
        <div className="search-form">
            <div className="search-form-input-container">
                <FaSearch size={"1.5em"} color="black" />
                <Input {...inputConfig} />
            </div>
        </div>
    )
}

export default Search
