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
//utils 
import { smallToBig, bigToSmall, dateBigToSmall, dateSmallToBig } from "../utils/sort"

const paginationButtonCreate = (totalCount) => {
    let paginationNumbers = [];

    for (let i = 0; i < totalCount / 30; i++) {
        paginationNumbers = [...paginationNumbers, i];
    }
    return paginationNumbers;
}

const observerSearch = new SearchBoxListener();

function Home() {
    //state
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filterActive, setFilterActive] = useState(false);
    const [flterResult, setFilterResult] = useState([]);
    const [totalCount, setTotalCount] = useState([]);
    const [selectedFilterOption, setSelectedFilterOption] = useState(0);
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
        const params = `&limit=${limit}&offset=${offset}${nameParams}`;
        getCharactersList(params).then(content => {
            const sortResult = sorting(content.data.results, selectedFilterOption);
            console.log(content.data);
            if (nameStartsWith !== null) {
                setFilterResult(sortResult);
            } else {
                setCharacters(sortResult);
                setTotalCount(paginationButtonCreate(content.data.total));
            }
            setLoading(false);
        }).catch(error => {
            alert(error);
        })
    }


    //view detail character with id 
    const redirectDetail = (characterId) => {
        history.push(`/detail/${characterId}`);
    }

    //pagination change
    const paginationChange = (number) => {
        history.push(`/home/${number}`);
    }




    const sorting = (data, selectedFilterOption) => {
        let result = []
        console.log(selectedFilterOption)
        if (selectedFilterOption === 0) {
            result = smallToBig(data);

        } else if (selectedFilterOption === 1) {
            result = bigToSmall(data);

        } else if (selectedFilterOption === 2) {

            result = dateBigToSmall(data);
        } else {
            result = dateSmallToBig(data);
        }
        return result;
    }


    useEffect(() => {
        function callGetCharacters() {
            const pageNumber = parseInt(params.pageNumber);
            getCharacters(pageNumber * 30, 30, selectedFilterOption);
            window.scrollTo(0, 0);
        }
        callGetCharacters();
        return () => 0
    }, [params.pageNumber])

    useEffect(() => {
        if (characters.length !== 0) {
            const updateCharacter = [...characters]
            setCharacters(sorting(updateCharacter, selectedFilterOption))
        }
    }, [selectedFilterOption])

    //components props
    const searchConfig = {
        charactersLength: characters.length,
        observer: observerSearch
    }

    const filterConfig = {
        charactersLength: characters.length,
        setSelectedFilerOption: setSelectedFilterOption,
    }


    return (
        <>
            <Navbar />
            {/* katman kontrolü revize edilecek */}
            <div className="container">
                <div className="list-container">
                    <Search  {...searchConfig} />
                    <Filter {...filterConfig} />
                    {
                        loading ? <Loading message="Characters " /> :
                            characters.length === 0 ? <p>No Characters.</p> :
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