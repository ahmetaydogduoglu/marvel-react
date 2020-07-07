//global imports
import React from 'react'
import PropsTypes from "prop-types"
//Components folders
import Card from "../cards/CharacterCard";
function CharactersMapping({ data, redirectDetail }) {
    return (
        data.map(item => (
            <Card key={item.id} content={item} handleClick={redirectDetail} />
        ))
    )
}

CharactersMapping.propTypes = {
    data: PropsTypes.array.isRequired,
    redirectDetail: PropsTypes.func.isRequired,
}

export default CharactersMapping
