//global imports
import React from 'react'
import PropsTypes from "prop-types"
import PaginationButton from "../PaginationButton"
//local folders
import "./Pagination.css"
//Components folders
import PaginationMapping from "../Lists/PaginationMapping"

function Pagination({ totalCount, selectedPagination, setSelectedPagintaion }) {
    const selectPage = () => setSelectedPagintaion(0);
    return (
        <>
            <PaginationButton selectedPagination={selectedPagination} number={1} selectPage={selectPage} />
            {selectedPagination > 3 && <p className="pagination-indacator">...</p>}

            {
                selectedPagination > 3 ? (
                    selectedPagination >= totalCount.length - 4 ? (
                        <PaginationMapping
                            selectedPagination={selectedPagination}
                            data={totalCount.slice(selectedPagination - 2, totalCount.length - 1)}
                            setSelectedPagintaion={setSelectedPagintaion}
                        />

                    ) : (
                            <PaginationMapping
                                selectedPagination={selectedPagination}
                                data={totalCount.slice(selectedPagination - 2, selectedPagination + 3)}
                                setSelectedPagintaion={setSelectedPagintaion} />
                        )

                ) : (
                        <PaginationMapping
                            selectedPagination={selectedPagination}
                            data={totalCount.slice(1, 6)}
                            setSelectedPagintaion={setSelectedPagintaion}
                        />
                    )
            }
            {selectedPagination <= totalCount.length - 4 && <p className="pagination-indacator">...</p>}
            <PaginationButton
                selectedPagination={selectedPagination}
                number={totalCount.length}
                selectPage={() => setSelectedPagintaion(totalCount.length - 1)} />
        </>
    )
}

Pagination.propTypes = {
    totalCount: PropsTypes.array.isRequired,
    selectedPagination: PropsTypes.number.isRequired,
    setSelectedPagintaion: PropsTypes.func.isRequired,
}

export default Pagination
