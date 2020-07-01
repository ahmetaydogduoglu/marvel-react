import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa';
//componenst
import Input from "../Input"
import Button from "../Button"
//local files
import "./Search.css"

function Search({ setFilterActive, onFilter }) {
    const [name, setName] = useState("");

    const inputConfig = {
        placeholder: "search character",
        value: name,
        name: "search",
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

    const buttonConfig = {
        onClick: () => alert("hello world")
    }

    return (
        <div className="search-form">
            <div className="search-form-input-container">
                <FaSearch size={"1.5em"} color="black" />
                <Input {...inputConfig} />
            </div>
            <Button {...buttonConfig}>
                Search
             </Button>
        </div>
    )
}

export default Search
