import React, { useEffect, useState, useRef } from 'react'
import "./Home.css"
import Card from "../components/CharacterCard"
import PaginationButton from "../components/PaginationButton"
import { useHistory } from "react-router-dom";
import md5 from "md5";
export default function Home() {
    //state
    const [characters, setCharacters] = useState([]);
    const [selectedPage, setSelectedPage] = useState(1);
    const [loading, setLoading] = useState(false);
    //navigaiton
    const history = useHistory();
    //Ref
    const scrollRef = useRef(null)


    const getCharacters = async (offset, limit) => {
        try {
            setLoading(true)
            const apiHash = md5("152673f008e9f857ff6a04a1230885ccd9ead8f84e9347c337310c590dec9467deba1f4e8")
            const response = await fetch(`https://gateway.marvel.com/v1/public/characters?ts=1&apikey=e9347c337310c590dec9467deba1f4e8&hash=${apiHash}&limit=${limit}&offset=${offset}`)
            const json = await response.json();
            setCharacters(c => c.concat(json.data.results));
            setLoading(false)
        } catch (error) {
            alert("There is a problem")
        }
    }

    const redirectDetail = (characterId) => {
        history.push(`/detail/${characterId}`);
    }

    const decreasePage = () => {
        setSelectedPage(c => c - 1)
        window.scrollTo(0, scrollRef.current.offsetTop)
    }

    const increasePage = () => {
        setSelectedPage(c => c + 1)
        window.scrollTo(0, scrollRef.current.offsetTop)

    }

    useEffect(() => {
        //page bottom request
        const onScroll = e => {
            if (e.target.documentElement.scrollTop + e.target.documentElement.offsetHeight > e.target.documentElement.scrollHeight - 50) {
                if (characters.length - (30 * (selectedPage)) === 0 && !loading && selectedPage !== 5) {
                    console.log(characters.length - (30 * (selectedPage)))
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
            <div className={"header"}>
                <h1>Marvel Characters</h1>
            </div>
            <div className="list-container">
                {
                    characters.length === 0 ?
                        <h5>Loading...</h5> : (
                            <div
                                ref={scrollRef}
                                style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", display: "flex" }}>
                                {
                                    characters.slice((selectedPage - 1) * 30, ((selectedPage - 1) * 30) + 30).map(item => {
                                        return (
                                            <Card key={item.id} content={item} handleClick={redirectDetail} />
                                        )
                                    })
                                }
                                <div className="paginaiton-contaiener">
                                    {
                                        loading ? (
                                            <p>loading...</p>
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
