import React, { useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import PropTypes from "prop-types"
// import PropTypes from 'prop-types'
import "./Filter.css"
const sortTypes = [
    {
        label: " Name",
        value: "name"
    },
    {
        label: "- Name",
        value: "-name"
    },
    {
        label: "Modifed",
        value: "modified"
    },
    {
        label: "- Modifed",
        value: "-modified"
    },
]
function Filter({ setSelectedFilerOption, selectedFilterOption }) {
    const [filterContentVisibility, setFilterContentVisibility] = useState(false);
    const onChange = (e) => {
        console.log("saldjasldjlsajdlsajdlkas")
        setSelectedFilerOption(e.target.value);
    }
    console.log(selectedFilterOption)
    return (
        <div className={filterContentVisibility ? "filter-container" : "filter-container hidden"}>
            <div className={"filter-title"}>
                <p>Sort Type</p>
                <button className={"filter-title-button"} onClick={() => setFilterContentVisibility(f => !f)}>
                    {
                        !filterContentVisibility ? (
                            <FaChevronDown color="#921c1c" size={"2rem"} />
                        ) : (<FaChevronUp color="#921c1c" size={"2rem"} />)
                    }
                </button>
            </div>
            {
                filterContentVisibility && (
                    sortTypes.map((item,i) => (
                        <div className="filter-option-list" key={i}>
                            <input onChange={onChange} type="radio" id="vehicle1" name="vehicle1" value={item.value} />
                            <label>{item.label}</label>
                        </div>
                    ))
                )

            }
        </div >
    )
}

Filter.propTypes = {
    setSelectedFilerOption: PropTypes.func.isRequired
}

export default Filter

