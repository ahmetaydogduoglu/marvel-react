import React from 'react'
import PropTypes from 'prop-types'
import Slider from '@material-ui/core/Slider';

function singleSlider({ sliderValue, handleValue, maxValue, minValue, stepValue }) {
    return <Slider value={sliderValue}
        max={maxValue}
        min={minValue}
        step={stepValue}
        onChange={handleValue}
        aria-labelledby="discrete-slider" />
}

singleSlider.propTypes = {
    sliderValue: PropTypes.number.isRequired,
    handleValue: PropTypes.func.isRequired,
    minValue: PropTypes.number.isRequired,
    maxValue: PropTypes.number.isRequired,
    stepValue: PropTypes.number.isRequired
}

export default singleSlider

