//global imports
import React from 'react'
import PropsTypes from "prop-types"
//local folders
import "./CharacterCard.css"


function CharacterCard({ content, handleClick }) {
    return (
        <div
            onClick={() => handleClick(content.id)}
            className="card-container">
            <img src={`${content.thumbnail.path}/portrait_fantastic.jpg`} alt="marvel" width="100%" height="70%"></img>
            <div style={{ width: "100%", display: "flex", height: "30%", backgroundColor: "black", justifyContent: "center", alignItems: "center" }}>
                <h3>{content.name}</h3>
            </div>
        </div>
    )
}

CharacterCard.propTypes  = {
    content: PropsTypes.object.isRequired,
    handleClick: PropsTypes.func.isRequired
}

export default CharacterCard
