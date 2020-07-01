//global imports
import React from 'react'
import PropsTypes from "prop-types"
//local folder
import "./PaginationButton.css"



function PaginationButton({ number, selectPage }) {
    return (
        <button
            className="pagination-button"
            onClick={() => selectPage()}>
            {number.toString()}
        </button>
    )
}

PaginationButton.propTypes = {
    number: PropsTypes.number.isRequired,
    selectPage: PropsTypes.func.isRequired
}

export default PaginationButton
