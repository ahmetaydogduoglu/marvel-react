//global imports
import React from 'react'
import PropsTypes from "prop-types"
//local folders
import "./CharacterCard.css"


function CharacterCard({ content, handleClick }) {
    return (
        <div className={"card-container-border"}>
            <div
                onClick={() => handleClick(content.id)}
                className="card-container">
                <img src={`${content.thumbnail.path}/portrait_fantastic.jpg`} alt="marvel" width="100%" height="70%"></img>
                <div className="card-subContainer">
                    <h3>{content.name}</h3>
                </div>
            </div>
        </div>

    )
}

CharacterCard.propTypes = {
    content: PropsTypes.object.isRequired,
    handleClick: PropsTypes.func.isRequired
}

export default CharacterCard
