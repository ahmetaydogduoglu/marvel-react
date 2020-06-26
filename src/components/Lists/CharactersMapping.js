import React from 'react'
import Card from "../CharacterCard";
import PropsTypes from "prop-types"
function CharactersMapping({ data, redirectDetail }) {
    return (
        data.map(item => (
            <Card key={item.id} content={item} handleClick={redirectDetail} />
        ))
    )
}

CharactersMapping.propTypes  = {
    data: PropsTypes.array.isRequired
}

export default CharactersMapping
