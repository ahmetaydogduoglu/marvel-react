import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa';
//componenst
import Input from "../Input"
//local files
import "./Search.css"

function Search({ setFilterActive, onFilter, charactersLength }) {
    const [name, setName] = useState("");

    const inputConfig = {
        placeholder: "search character",
        value: name,
        name: "search",
        disabled: charactersLength === 0 ? true : false,
        onChange: e => {
            setName(e.target.value);
            if (name.trim().length > 2) {
                setFilterActive(true);
                onFilter(name);
            }
            if (name.trim().length < 2) {
                setFilterActive(false);
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
