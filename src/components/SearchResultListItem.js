import React from 'react'
import PropTypes from 'prop-types'
//local file 
import "./SearchResultListItem.css"
const SearchResultListItem = ({ content, handleClick }) => {
    return (
        <div onClick={() => handleClick()} className="search-result-list-item-container">
            {content.name}
        </div>
    )
}

SearchResultListItem.propTypes = {
    content: PropTypes.object.isRequired,
    handleClick: PropTypes.func.isRequired,
}

export default SearchResultListItem
