//global imports
import React from 'react'
import PropsTypes from "prop-types"
//components
import PaginationButton from "../PaginationButton"

function PaginationMapping({ data, setSelectedPagintaion }) {
    return data.map((item, i) => (
        <PaginationButton
            key={i}
            number={item + 1} selectPage={() => setSelectedPagintaion(item)} />
    ))
}

PaginationMapping.propTypes = {
    data: PropsTypes.array.isRequired,
    setSelectedPagintaion: PropsTypes.func.isRequired,
}

export default PaginationMapping
