import React from 'react'
import PropTypes from 'prop-types'
//components
import ComicCard from "../Cards/ComicsCard"
function ComicsList({ data }) {
    return (
        data.map((item, index) => (
            <ComicCard content={item} key={index} />
        ))
    )
}

ComicsList.propTypes = {
    data: PropTypes.array.isRequired
}

export default ComicsList

