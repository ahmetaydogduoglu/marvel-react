import React from 'react'
import PropTypes from 'prop-types'

function ComicsList({ data }) {
    return (
        <ul>
            {
                data.map((item, index) => (
                    <li key={index}>
                        {item.title}
                    </li>
                ))
            }
        </ul>
    )
}

ComicsList.propTypes = {
    data: PropTypes.array.isRequired
}

export default ComicsList

