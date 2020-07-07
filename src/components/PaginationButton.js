//global imports
import React from 'react'
import PropsTypes from "prop-types"
//local folder
import "./PaginationButton.css"



function PaginationButton({ number, selectPage, selectedPagination }) {
    return (
        <button
            className={selectedPagination !== number ? "pagination-button" : "pagination-button selected-pagination"}
            onClick={() => selectPage()}>
            {number.toString()}
        </button>
    )
}

PaginationButton.propTypes = {
    number: PropsTypes.number.isRequired,
    selectPage: PropsTypes.func.isRequired,
    selectedPagination: PropsTypes.number.isRequired
}

export default PaginationButton
