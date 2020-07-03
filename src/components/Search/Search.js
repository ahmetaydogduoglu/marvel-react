import React, { useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa';
//componenst
import Input from "../Input"
//local files
import "./Search.css"


function Search({ charactersLength, observer }) {
    const [searchText, setSearchText] = useState("");
    useEffect(() => {
        observer.setObserver(searchText);
    }, [searchText])
    const inputConfig = {
        placeholder: "search character",
        value: searchText,
        name: "search",
        disabled: charactersLength === 0 ? true : false,
        onChange: e => {

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
