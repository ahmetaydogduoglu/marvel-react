import React, { useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import PropTypes from "prop-types"
//local
import "./Filter.css"
import FilterCheckBox from "./FilterCheckBox"
//components 
import Slider from "../Slider/Slider";

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
    //state
    const [filterContentVisibility, setFilterContentVisibility] = useState(false);
    const [sliderValue, setSliderValue] = useState(0)

    //checkBox handler
    const onChange = (e) => {
        setSelectedFilerOption(parseInt(e.target.value));
    }

    const sliderConfig = {
        handleValue: (event, newValue) => setSliderValue(newValue),
        maxValue: 100,
        minValue: 0,
        sliderValue: sliderValue,

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
                <div className="filter-options-container">
                    <div className="slider-container">
                        <p>{sliderValue}</p>
                        <Slider {...sliderConfig} />
                    </div>
                    {sortTypes.map((item, i) => (
                        <FilterCheckBox key={i} name={item.label} onChange={onChange} selectedOption={selectedOption} value={item.value} />
                    ))}
                </div>
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

