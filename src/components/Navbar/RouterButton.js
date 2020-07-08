import React from 'react'
import "./RouterButton.css"
import {
    Link
} from "react-router-dom";
function RouterButton(props) {
    return <Link className="navbar-links" to={props.path}>
        {props.name}
    </Link>
}



export default RouterButton

