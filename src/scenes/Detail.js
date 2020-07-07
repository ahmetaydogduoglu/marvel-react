//global imports
import React, { useEffect, useState } from 'react'
import {
    useParams, useHistory
} from "react-router-dom";
//local imports
import "./Detail.css"
//components
import ComicsMap from "../components/Lists/ComicsMapping"
import Loading from "../components/loading"
import Navbar from "../components/Navbar/Navbar"
//services
import { getCharacterDetail, getCharacterComics } from "../services/characterDetail"

export default function Detail() {
    const [character, setCharacter] = useState(null);
    const [comics, setComics] = useState(null);
    const { id } = useParams();
    const history = useHistory();

    const getCharacterWithComics = () => {
        // call get character content
        getCharacterDetail(id)
            .then(content => {
                setCharacter(content.data.results[0]);
                //call get charater comics
                const comicsParams = `&dateRange=2005-01-01,2020-12-12&limit=${15}`
                return getCharacterComics(id, comicsParams);
            }).then(comics => {
                console.log(comics.data);
                setComics(comics.data.results);
            }).catch(error => {
                alert(error);
            })
    }

    useEffect(() => {
        getCharacterWithComics();
        return () => 0
    }, [])

    const goBack = () => history.goBack();

    return (
        <>
            <Navbar backButtonVisibility={true} backAction={goBack} />
            <div className={"detail-container"}>
                {character === null ? <Loading message="Character " /> : (
                    <div className={"detail-content"}>
                        {/* <h2>{character.name}</h2> */}
                        <div className={"character-detail-card"}>

                            <div className="detail-image-container">
                                <img src={`${character.thumbnail.path}/portrait_fantastic.jpg`} alt="Girl in a jacket"></img>
                            </div>

                            <div className="character-description-container">
                                <h4>Character Descrtiption</h4>
                                <p style={{ color: "#fff" }}>
                                    {character.description.length > 0 ? character.description : "No Description."}
                                </p>
                            </div>
                        </div>
                        <div className={"comics-list-detail"}>
                            <h3>Comics</h3>

                            {comics === null ? <Loading message="Comics " /> : <div className="comics-list">
                                {
                                    comics.length === 0 ?
                                        <p>No Comics.</p> :
                                        <ComicsMap data={comics} />
                                }
                            </div>}
                        </div>
                    </div>
                )}
            </div>
        </>

    )
}
