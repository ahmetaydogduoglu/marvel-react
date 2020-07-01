import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa';
import { useHistory } from "react-router-dom";
//componenst
import Navbar from '../components/Navbar/Navbar'
import Input from "../components/Input"
import Button from "../components/Button"
import Loading from "../components/loading"
import ResultMap from "../components/Lists/SearchResultMapping"
//local files
import "./Search.css"
//services
import { searchCharacter } from "../services/searchCharacter"

function Search() {

    //state
    const [name, setName] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    //histort
    const history = useHistory();

    const search = () => {
        if (name.trim().length === 0) {
            alert("Please write character name")
        } else {
            setLoading(true);
            searchCharacter(name).then(content => {
                setResult(content.data.results);
                console.log(content.data);
                setLoading(false);
            }).catch(err => {
                alert("There is a problem");
                setLoading(false);
            })
        }
    }

    const inputConfig = {
        placeholder: "search character",
        value: name,
        name: "search",
        onChange: e => {
            setName(e.target.value);
        }
    }

    const redirectDetail = (characterId) => {
        history.push(`/detail/${characterId}`)
    }

    const buttonConfig = {
        onClick: search
    }

    return (
        <>
            <Navbar backButtonVisibility={true} />
            <div className="search-container">
                <div className="search-form">
                    <div className="search-form-input-container">
                        <FaSearch size={"1.5em"} color="black" />
                        <Input {...inputConfig} />
                    </div>
                    <Button {...buttonConfig}>
                        Search
                    </Button>
                </div>
                <div className="search-result-list-container">
                    {
                        loading ? (
                            <Loading message="characters " />
                        ) : (
                                result !== null ? (
                                    result.length === 0 ?
                                        <p>No Characters</p> :
                                        <ResultMap data={result} redirectDetail={redirectDetail} />
                                ) : null
                            )
                    }

                </div>
            </div>
        </>

    )
}

export default Search
