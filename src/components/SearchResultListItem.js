import React from 'react'
import PropTypes from 'prop-types'
//local file 
import "./SearchResultListItem.css"
const SearchResultListItem = ({ content, handleClick }) => {
    return (
        <div onClick={() => handleClick(content.id)} className="search-result-list-item-container">
            <div className={"image-container"}>
                <img src={`${content.thumbnail.path}/portrait_fantastic.jpg`} alt="marvel" width="100%" height="100%"></img>
            </div>
            <p>{content.name}</p>
        </div>
    )
}

SearchResultListItem.propTypes = {
    content: PropTypes.object.isRequired,
    handleClick: PropTypes.func.isRequired,
}

export default SearchResultListItem
