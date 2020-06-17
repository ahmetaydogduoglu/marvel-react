import React from 'react'
import "./PaginationButton.css"
export default function PaginationButton({ number, selectPage }) {
    return (
        <button
            className="pagination-button"
            onClick={() => selectPage()}>
            {number}
        </button>
    )
}
