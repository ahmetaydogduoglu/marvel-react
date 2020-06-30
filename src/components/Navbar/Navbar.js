import React from 'react'
import PropTypes from 'prop-types'
//local files 
import "./Navbar.css"

function Navbar(props) {
    return (
        <div className={"header"}>
            <img src={"marvel-logo.png"} height={"45rem"}/>
        </div>
    )
}

Navbar.propTypes = {

}

export default Navbar

