import React, { useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import PropTypes from "prop-types"
// import PropTypes from 'prop-types'
import "./Filter.css"
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
function Filter({ setSelectedFilerOption, charactersLength }) {
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
            {
                filterContentVisibility && (
                    sortTypes.map((item, i) => (
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

