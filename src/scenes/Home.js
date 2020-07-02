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
    const [loading, setLoading] = useState(false);
    const [filterActive, setFilterActive] = useState(false);
    const [flterResult, setFilterResult] = useState([]);
    const [totalCount, setTotalCount] = useState([]);
    const [selectedPagination, setSelectedPagintaion] = useState(0);

    //navigaiton
    const history = useHistory();

    //Ref
    const scrollRef = useRef(null);

    //api call
    const getCharacters = (offset, limit, nameStartsWith = null) => {
        setLoading(true);
        //call get character
        console.log(offset, limit)
        const params = `&limit=${limit}&offset=${offset}${nameStartsWith !== null ? "&nameStartsWith=" + nameStartsWith : ""}`
        getCharactersList(params).then(content => {
            if (nameStartsWith !== null) {
                setFilterResult(content.data.results);
            } else {
                setCharacters(content.data.results);
                setTotalCount(paginationButtonCreate(content.data.total))
            }
            setLoading(false);
        }).catch(error => {
            alert(error);
        })
    }


    //filter
    const filterInCharacterName = (name) => {
        let tempChatactersList = []
        characters.forEach(item => {
            if (item.name.toLowerCase().startsWith(name)) {
                tempChatactersList = tempChatactersList.concat(item)
            }
        })
        if (tempChatactersList.length > 0) {
            setFilterResult(tempChatactersList);
        } else {
            getCharacters(0, 50, name);
        }
    }

    //view detail character with id 
    const redirectDetail = (characterId) => {
        history.push(`/detail/${characterId}`);
    }



    // useEffect(() => {

    //     //page bottom request
    //     // const onScroll = e => {
    //     //     if (e.target.documentElement.scrollTop + e.target.documentElement.offsetHeight > e.target.documentElement.scrollHeight / 2) {
    //     //         if (characters.length - (30 * (selectedPage)) === 0 && !loading && selectedPage !== 5) {
    //     //             console.log(characters.length - (30 * (selectedPage)));
    //     //             getCharacters(30 * (selectedPage), 30);
    //     //         }
    //     //     }
    //     // };
    //     // window.addEventListener("scroll", onScroll);
    //     // return () => window.removeEventListener("scroll", onScroll);
    //     console.log("2.")
    //     getCharacters(selectedPagination * 30, 30);

    // }, [selectedPagination]);

    useEffect(() => {
        getCharacters(selectedPagination * 30, 30);
        window.scrollTo(0, 0);
    }, [selectedPagination]);

    useEffect(() => {
        if (!filterActive) {
            setFilterResult([]);
        }
    }, [filterActive])

    const searchConfig = {
        setFilterActive: setFilterActive,
        onFilter: filterInCharacterName,
        charactersLength: characters.length
    }

    return (
        <>
            <Navbar />
            {/* katman kontrolü revize edilecek */}
            <div className="container">
                <div className="list-container">
                    <Search  {...searchConfig} />
                    {
                        loading ? <Loading message="Characters " /> :
                            (
                                <div className="character-list-row" ref={scrollRef}>
                                    {/*characters mapping*/}
                                    <CharactersMapping
                                        data={
                                            filterActive ?
                                                flterResult
                                                : characters
                                        }
                                        redirectDetail={redirectDetail}
                                    />
                                    {!filterActive & !loading && (
                                        <div className="paginaiton-contaiener">
                                            <PaginationMapping
                                                totalCount={totalCount}
                                                selectedPagination={selectedPagination}
                                                setSelectedPagintaion={setSelectedPagintaion} />
                                        </div>
                                    )}
                                </div>
                            )
                    }
                </div>
            </div>
        </>

    )
}

export default Home