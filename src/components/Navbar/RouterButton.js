import React from 'react'
import "./RouterButton.css"
import {
    Link
} from "react-router-dom";
function RouterButton(props) {
    return <Link to={props.path}>
        <button type="button" className="router-button" {...props}>{props.name}</button>
    </Link>
}



export default RouterButton

