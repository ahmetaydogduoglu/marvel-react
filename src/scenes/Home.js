//global
import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from "react-router-dom";
//local folder
import "./Home.css";
//components
import PaginationButton from "../components/PaginationButton";
import Loading from "../components/loading";
import CharactersMapping from "../components/Lists/CharactersMapping";
import Navbar from "../components/Navbar/Navbar";
//services
import { getCharactersList } from "../services/getCharacters";

function Home() {

    //state
    const [characters, setCharacters] = useState([]);
    const [selectedPage, setSelectedPage] = useState(1);
    const [loading, setLoading] = useState(false);

    //navigaiton
    const history = useHistory();

    //Ref
    const scrollRef = useRef(null);


    const getCharacters = (offset, limit) => {
        setLoading(true);
        //call get character
        getCharactersList(limit, offset).then(content => {
            setCharacters(c => c.concat(content.data.results));
            console.log("merhaba")
            setLoading(false);
        }).catch(error => {
            alert(error);
        })
    }

    //view detail character with id 
    const redirectDetail = (characterId) => {
        history.push(`/detail/${characterId}`);
    }


    //pagination button func
    const decreasePage = () => {
        setSelectedPage(c => c - 1);
        window.scrollTo(0, scrollRef.current.offsetTop);
    }

    const increasePage = () => {
        setSelectedPage(c => c + 1)
        window.scrollTo(0, scrollRef.current.offsetTop);

    }

    useEffect(() => {
        //page bottom request
        const onScroll = e => {
            if (e.target.documentElement.scrollTop + e.target.documentElement.offsetHeight > e.target.documentElement.scrollHeight / 2) {
                if (characters.length - (30 * (selectedPage)) === 0 && !loading && selectedPage !== 5) {
                    console.log(characters.length - (30 * (selectedPage)));
                    getCharacters(30 * (selectedPage), 30);
                }
            }
        };
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, [selectedPage, characters, loading]);

    useEffect(() => {
        //first request
        getCharacters(0, 30);
    }, []);

    return (
        <div className="container">
            <Navbar />
            <div className="list-container">
                {
                    characters.length === 0 ?
                        <Loading message="Characters " />
                        : (
                            <div
                                className="character-list-row" ref={scrollRef}>
                                {/*characters mapping*/}
                                <CharactersMapping
                                    data={characters.slice((selectedPage - 1) * 30, ((selectedPage - 1) * 30) + 30)}
                                    redirectDetail={redirectDetail}
                                />
                                <div className="paginaiton-contaiener">
                                    {
                                        loading ? (
                                            <Loading message="Other Page " />
                                        ) : (
                                                <>
                                                    {selectedPage !== 1 && (
                                                        <PaginationButton number={"prev"} selectPage={decreasePage} />
                                                    )}
                                                    {
                                                        selectedPage !== 5 && (
                                                            <PaginationButton number={"next"} selectPage={increasePage} />

                                                        )
                                                    }
                                                </>
                                            )
                                    }
                                </div>
                            </div>
                        )
                }
            </div>
        </div>
    )
}

export default Home