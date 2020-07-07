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
import SearchBoxListen from "../observers/SearchBoxListen";
//utils
import { smallToBig, bigToSmall, dateBigToSmall, dateSmallToBig } from "../utils/sort"

const paginationButtonCreate = (totalCount) => {
    let paginationNumbers = [];

    for (let i = 0; i < totalCount / 30; i++) {
        paginationNumbers = [...paginationNumbers, i];
    }
    return paginationNumbers;
}

const searchListen = new SearchBoxListen();

function Home() {
    //state
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filterActive, setFilterActive] = useState(false);
    const [filterResult, setFilterResult] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [selectedFilterOption, setSelectedFilterOption] = useState(0);
    const [searchBox, setSearchBox] = useState("");
    //router
    const history = useHistory();
    const params = useParams();
    //Ref
    const scrollRef = useRef(null);

    //api call
    const getCharacters = (offset, limit, nameStartsWith = null) => {
        setLoading(true);
        //call get character
        const nameParams = nameStartsWith !== null ? "&nameStartsWith=" + nameStartsWith : "";
        const params = `&limit=${limit}&offset=${offset}${nameParams}`;
        getCharactersList(params).then(content => {
            const sortResult = sorting(content.data.results, selectedFilterOption);

            //if page number biggest from totalCount
            if (!filterActive && content.data.count === 0) {
                paginationChange(1);
            }
            else if (nameStartsWith !== null) {
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
            let pageNumber = parseInt(params.pageNumber);
            if (pageNumber < 1) {
                paginationChange(1);
            } else {
                pageNumber -= 1
                getCharacters(pageNumber * 30, 30);
                window.scrollTo(0, 0);
            }
        }
        callGetCharacters();
    }, [params.pageNumber])


    useEffect(() => {
        const filterOptionAction = () => {
            if (characters.length !== 0 && !filterActive) {
                const updateCharacter = [...characters];
                setCharacters(sorting(updateCharacter, selectedFilterOption));
            } else if (filterActive) {
                const updateCharacterSearch = [...filterResult];
                setFilterResult(sorting(updateCharacterSearch, selectedFilterOption));
            }
        }
        filterOptionAction();
    }, [selectedFilterOption])

    const setSearch = (value) => setSearchBox(value.text);

    useEffect(() => {
        const searchSubscribe = searchListen.searchTextChangeListen().subscribe(setSearch)
        return () => {
            searchSubscribe.unsubscribe();
        }
    }, [])

    //search
    useEffect(() => {
        const searchBoxAction = () => {
            if (searchBox.length > 0) {
                const findResult = characters.filter(item => item.name === searchBox)
                if(searchBox.length > 3 ){
                    setFilterActive(true);
                    if (findResult.length === 0) {
                        getCharacters(0, 100, searchBox);
                    } else {
                        setCharacters(findResult);
                    }
                }
            } else if (searchBox.length === 0) {
                setFilterActive(false);
                setFilterResult([])
            }
        }
        searchBoxAction();
    }, [searchBox])


    //components props
    const searchConfig = {
        charactersLength: characters.length,
        searchTextSet: searchListen
    }

    const filterConfig = {
        charactersLength: characters.length,
        setSelectedFilerOption: setSelectedFilterOption,
        selectedOption: selectedFilterOption
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
                            <>
                                {
                                    characters.length === 0 ? <p>No Characters.</p> :
                                    filterResult.length  === 0&& filterActive ?  <p>No Characters.</p>:
                                        (
                                            <div className="character-list-row" ref={scrollRef}>
                                                {/*characters mapping*/}
                                                <CharactersMapping
                                                    data={
                                                        filterActive ?
                                                            filterResult
                                                            : characters
                                                    }
                                                    redirectDetail={redirectDetail}
                                                />

                                            </div>
                                        )
                                }
                                {totalCount !== 0 && !filterActive ? (
                                    <div className="paginaiton-contaiener">
                                        <PaginationMapping
                                            totalCount={totalCount}
                                            selectedPagination={parseInt(params.pageNumber)}
                                            setSelectedPagintaion={paginationChange} />
                                    </div>
                                ) : null}
                            </>
                    }
                </div>
            </div>
        </>

    )
}

export default Home