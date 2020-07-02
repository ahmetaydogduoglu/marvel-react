//global
import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from "react-router-dom";
//local folder
import "./Home.css";
//components
import Loading from "../components/loading";
import CharactersMapping from "../components/Lists/CharactersMapping";
import Navbar from "../components/Navbar/Navbar";
import PaginationMapping from "../components/Pagination/Paginaiton"
// import Filter from "../components/Filter/Filter";
import Search from "../components/Search/Search"
//services
import { getCharactersList } from "../services/getCharacters";


const paginationButtonCreate = (totalCount) => {
    let paginationNumbers = [];
    console.log(totalCount);
    for (let i = 0; i < totalCount / 40; i++) {
        paginationNumbers = [...paginationNumbers, i];
    }
    return paginationNumbers;
}


function Home() {

    //state
    const [characters, setCharacters] = useState([]);
    const [selectedPage, setSelectedPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [filterLoading, setFilterLoading] = useState(false);
    const [filterActive, setFilterActive] = useState(false);
    const [flterResult, setFilterResult] = useState([]);
    const [totalCount, setTotalCount] = useState([]);
    const [selectedPagination, setSelectedPagintaion] = useState(0)
    //navigaiton
    const history = useHistory();

    //Ref
    const scrollRef = useRef(null);

    //api call
    const getCharacters = (offset, limit, nameStartsWith = null) => {
        setLoading(true);
        //call get character
        const params = `&limit=${limit}&offset=${offset}${nameStartsWith !== null ? "&nameStartsWith=" + nameStartsWith : ""}`
        getCharactersList(params).then(content => {
            if (nameStartsWith !== null) {
                setFilterResult(content.data.results);
            } else {
                setCharacters(c => c.concat(content.data.results));
                setTotalCount(paginationButtonCreate(content.data.total))
            }
            setLoading(false);
            setFilterLoading(false);
        }).catch(error => {
            alert(error);
        })
    }


    //filter
    const filterInCharacterName = (name) => {
        let tempChatactersList = []
        setFilterLoading(true);
        characters.forEach(item => {
            if (item.name.toLowerCase().startsWith(name)) {
                tempChatactersList = tempChatactersList.concat(item)
            }
        })
        if (tempChatactersList.length > 0) {
            setFilterResult(tempChatactersList);
            setFilterLoading(false);
        } else {
            getCharacters(0, 50, name);
        }
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
        if (!filterActive) {
            setFilterResult([]);
        }
    }, [filterActive])

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

    const searchConfig = {
        setFilterActive: setFilterActive,
        onFilter: filterInCharacterName
    }

    return (
        <>
            <Navbar />
            {/* katman kontrolü revize edilecek */}
            <div className="container">
                <div className="list-container">
                    {
                        characters.length === 0 ?
                            <Loading message="Characters " />
                            : (
                                <>
                                    <Search {...searchConfig} />
                                    <div
                                        className="character-list-row" ref={scrollRef}>
                                        {/*characters mapping*/}

                                        <CharactersMapping
                                            data={
                                                filterActive ?
                                                    flterResult
                                                    : characters.slice((selectedPage - 1) * 30, ((selectedPage - 1) * 30) + 30)
                                            }
                                            redirectDetail={redirectDetail}
                                        />
                                        {!filterActive && (
                                            <div className="paginaiton-contaiener">
                                                <PaginationMapping
                                                    totalCount={totalCount}
                                                    selectedPagination={selectedPagination}
                                                    setSelectedPagintaion={setSelectedPagintaion} />
                                            </div>
                                        )}

                                    </div>
                                </>
                            )
                    }
                </div>
            </div>
        </>

    )
}

export default Home