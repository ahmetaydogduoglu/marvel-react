import React from 'react'
import "./PaginationButton.css"
import PropsTypes from "prop-types"

function PaginationButton({ number, selectPage }) {
    return (
        <button
            className="pagination-button"
            onClick={() => selectPage()}>
            {number}
        </button>
    )
}

PaginationButton.propTypes = {
    number: PropsTypes.number.isRequired,
    selectPage: PropsTypes.func.isRequired
}

export default PaginationButton
