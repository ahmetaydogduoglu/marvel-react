import React, { useEffect, useState } from 'react'
import "./Detail.css"
import {
    useParams, useHistory
} from "react-router-dom";
import { getCharacterDetail, getCharacterComics } from "../services/characterDetail"

export default function Detail() {
    const [character, setCharacter] = useState(null);
    const [comics, setComics] = useState(null);
    const { id } = useParams();
    const history = useHistory();

    const getCharacterWithComics = async () => {
        try {
            const comicsJson = await getCharacterComics(id, { startDate: "2005-01-01", endDate: "2020-05-05" }, 10);
            setComics(comicsJson.data.results);
            const characterDetail = await getCharacterDetail(id);
            setCharacter(characterDetail.data.results[0]);
        } catch (error) {
            alert("There is a problem");
        }

    }

    useEffect(() => {
        getCharacterWithComics();
    }, [])

    return (
        <div className={"detail-container"}>
            <div className={"detail-header"}>
                <button
                    onClick={() => history.goBack()}
                    style={{ position: "absolute", left: 15, }}>
                    Back
                </button>
                <h1>Marvel Characters</h1>

            </div>
            <div className={"detail-content"}>
                {
                    character === null ? "loading..." : (
                        <>
                            <h2>{character.name}</h2>
                            <div className={"character-detail-card"} style={{
                                flexDirection: "row",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "20rem",
                                width: "35rem",
                                backgroundColor: "black",
                                borderRadius: "15px",
                            }}>
                                <img src={`${character.thumbnail.path}/portrait_fantastic.jpg`} alt="Girl in a jacket" width="40%" height="100%"></img>
                                <div style={{ width: "65%", height: "100%", padding: ".5rem" }}>
                                    <h4>Character Descrtiption</h4>
                                    <p style={{ color: "#fff" }}>
                                        {character.description}
                                    </p>
                                </div>
                            </div>
                            <div className={"comics-list-detail"}>
                                <h3>Comics</h3>
                                <ul>
                                    {
                                        comics.map((item, index) => (
                                            <li key={index}>
                                                {item.title}
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </>

                    )
                }

            </div>
        </div>
    )
}
