import React, { useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa';
//componenst
import Input from "../Input"
//local files
import "./Search.css"
//observer 


function Search({ charactersLength, searchTextSet }) {
    const [searchText, setSearchText] = useState("");

    const inputConfig = {
        placeholder: "search character",
        value: searchText,
        name: "search",
        disabled: charactersLength === 0 ? true : false,
        onChange: e => {
            searchTextSet.setSearchText(e.target.value)
            setSearchText(e.target.value);
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
