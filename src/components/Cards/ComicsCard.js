import React from 'react'
import PropTypes from 'prop-types'
//local files 
import "./ComicsCard.css"
function ComicsCard({ content }) {
    return (
        <div className={"comics-card-container"}>
            <div className="image-container">
                <img src={`${content.thumbnail.path}/standard_large.jpg`} alt="marvel"/>
            </div>
            <div className="comic-title-container">
                <p>{content.title}</p>
            </div>
        </div>
    )
}

ComicsCard.propTypes = {
    content: PropTypes.object.isRequired
}

export default ComicsCard

