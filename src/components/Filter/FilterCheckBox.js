import React from 'react'
import PropTypes from 'prop-types'
import "./FilterCheckBox.css"
function FilterCheckBox({ selectedOption, name, value, onChange }) {
    return (
        <div>
            <div className="filter-option-list" >
                <input checked={selectedOption === value ? true : false} onChange={onChange} type="radio" id="vehicle1" name="vehicle1" value={value} />
                <label>{name}</label>
            </div>
        </div>
    )
}

FilterCheckBox.propTypes = {
    selectedOption: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
}

export default FilterCheckBox

