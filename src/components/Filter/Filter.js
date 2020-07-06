import React, { useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import PropTypes from "prop-types"
//local
import "./Filter.css"
import FilterCheckBox from "./FilterCheckBox"
const sortTypes = [
    {
        label: " Name",
        value: 0
    },
    {
        label: "- Name",
        value: 1
    },
    {
        label: "Modifed",
        value: 2
    },
    {
        label: "- Modifed",
        value: 3
    },
]
function Filter({ setSelectedFilerOption, charactersLength, selectedOption }) {
    const [filterContentVisibility, setFilterContentVisibility] = useState(false);
    const onChange = (e) => {
        setSelectedFilerOption(parseInt(e.target.value));
    }
    return (
        <div className={filterContentVisibility ? "filter-container" : "filter-container hidden"}>
            <div className={"filter-title"}>
                <p>Sort Type</p>
                <button
                    disabled={charactersLength === 0 ? true : false}
                    className={"filter-title-button"} onClick={() => setFilterContentVisibility(f => !f)}>
                    {
                        !filterContentVisibility ? (
                            <FaChevronDown color="#921c1c" size={"2rem"} />
                        ) : (<FaChevronUp color="#921c1c" size={"2rem"} />)
                    }
                </button>
            </div>
            {filterContentVisibility && (
                sortTypes.map(item => (
                    <FilterCheckBox name={item.label} onChange={onChange} selectedOption={selectedOption} value={item.value} />
                ))
            )}

        </div >
    )
}

Filter.propTypes = {
    setSelectedFilerOption: PropTypes.func.isRequired,
    selectedOption: PropTypes.number.isRequired,
    charactersLength: PropTypes.number.isRequired,
}

export default Filter

