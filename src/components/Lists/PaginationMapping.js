//global imports
import React from 'react'
import PropsTypes from "prop-types"
import PaginationButton from "../PaginationButton"
//Components folders
function PaginationMapping({ totalCount, selectedPagination, setSelectedPagintaion }) {
    const selectPage = () => setSelectedPagintaion(0);
    return (
        <>
            <PaginationButton number={1} selectPage={selectPage} />

            <p>... </p>
            {
                selectedPagination > 3 ? (
                    totalCount.slice(selectedPagination - 3, selectedPagination + 2).map(item => (
                        <PaginationButton number={item + 1} selectPage={() => setSelectedPagintaion(item)} />

                    ))
                ) : (
                        totalCount.slice(1, 6).map(item => (
                            <PaginationButton number={item + 1} selectPage={() => setSelectedPagintaion(item)} />
                        ))
                    )
            }
            <p>...</p>
            <PaginationButton number={totalCount.length} selectPage={() => setSelectedPagintaion(totalCount.length - 1)} />
        </>
    )
}

PaginationMapping.propTypes = {
    totalCount: PropsTypes.array.isRequired,
    selectedPagination: PropsTypes.number.isRequired,
    setSelectedPagintaion: PropsTypes.func.isRequired,
}

export default PaginationMapping
