import React, { useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

// import PropTypes from 'prop-types'
import "./Filter.css"
const sortTypes = [
    {
        label: "Character Name",
        value: 0
    },
    {
        label: "Character Name",
        value: 1
    },
    {
        label: "Modifed",
        value: 2
    },
    {
        label: "Modifed",
        value: 3
    },
]
function Filter(props) {
    const [filterContentVisibility, setFilterContentVisibility] = useState(false)
    return (
        <div className={filterContentVisibility ? "filter-container" : "filter-container hidden"}>
            <div className={"filter-title"}>
                <p>Sort Type</p>
                <button className={"filter-title-button"} onClick={() => setFilterContentVisibility(f => !f)}>
                    {
                        !filterContentVisibility ? (
                            <FaChevronDown size={"2rem"}/>
                        ) : (<FaChevronUp size={"2rem"}/>)
                    }
                </button>
            </div>
            {
                filterContentVisibility && (
                    sortTypes.map(item => (
                        <div className="filter-option-list">
                            <input type="radio" id="vehicle1" name="vehicle1" value="Bike" />
                            <label>{item.label}</label>
                        </div>
                    ))
                )

            }
        </div >
    )
}

// Filter.propTypes = {

// }

export default Filter

