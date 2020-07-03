//global
import React, { useEffect, useState, useRef } from 'react';
import { useHistory, useParams } from "react-router-dom";
//local folder
import "./Home.css";
//components
import Loading from "../components/loading";
import CharactersMapping from "../components/Lists/CharactersMapping";
import Navbar from "../components/Navbar/Navbar";
import PaginationMapping from "../components/Pagination/Paginaiton"
import Filter from "../components/Filter/Filter"
// import Filter from "../components/Filter/Filter";
import Search from "../components/Search/Search"
//services
import { getCharactersList } from "../services/getCharacters";
//observers
import SearchBoxListener from "../observers/SearchBoxListen";

const paginationButtonCreate = (totalCount) => {
    let paginationNumbers = [];

    for (let i = 0; i < totalCount / 40; i++) {
        paginationNumbers = [...paginationNumbers, i];
    }
    return paginationNumbers;
}

const searchBoxListener = new SearchBoxListener("");

function Home() {
    //state
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filterActive, setFilterActive] = useState(false);
    const [flterResult, setFilterResult] = useState([]);
    const [totalCount, setTotalCount] = useState([]);
    const [selectedFilterOption, setSelectedFilterOption] = useState("name");
    const [searchText, setSearchText] = useState("");
    //router
    const history = useHistory();
    const params = useParams();

    //Ref
    const scrollRef = useRef(null);

    //api call 
    const getCharacters = (offset, limit, sortType, nameStartsWith = null) => {
        setLoading(true);
        //call get character
        const nameParams = nameStartsWith !== null ? "&nameStartsWith=" + nameStartsWith : "";
        const orderBy = "&orderBy=" + sortType;
        const params = `&limit=${limit}&offset=${offset}${nameParams}${orderBy}`;
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
            getCharacters(0, 50, "name", name);
        }
    }

    //view detail character with id 
    const redirectDetail = (characterId) => {
        history.push(`/detail/${characterId}`);
    }

    // useEffect(() => {
    //     function callGetChatactesr() {
    //         const pageNumber = parseInt(params.pageNumber) - 1;
    //         setSelectedPagintaion(pageNumber);
    //         getCharacters(pageNumber * 30, 30, selectedFilterOption);
    //         window.scrollTo(0, 0);
    //     }

    //     callGetChatactesr();
    // }, [selectedPagination, selectedFilterOption]);

    const paginationChange = (number) => {
        history.push(`/home/${number}`);
    }

    useEffect(() => {
        function callGetCharacters() {
            const pageNumber = parseInt(params.pageNumber);
            getCharacters(pageNumber * 30, 30, selectedFilterOption);
            window.scrollTo(0, 0);
        }
        callGetCharacters();
    }, [params.pageNumber])

    useEffect(() => {
        console.log(searchBoxListener.getFilterActive())
    }, [searchBoxListener.filterAvtive])

    //components props
    const searchConfig = {
        setFilterActive: setFilterActive,
        charactersLength: characters.length,
        searchBoxObject: searchBoxListener
    }

    const filerConfig = {
        setSelectedFilerOption: setSelectedFilterOption,
        selectedFilterOption: selectedFilterOption
    }

    return (
        <>
            <Navbar />
            {/* katman kontrolü revize edilecek */}
            <div className="container">
                <div className="list-container">
                    <Search  {...searchConfig} />
                    <Filter {...filerConfig} />
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
                                                selectedPagination={parseInt(params.pageNumber)}
                                                setSelectedPagintaion={paginationChange} />
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