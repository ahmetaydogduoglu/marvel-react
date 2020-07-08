import React from 'react'
import PropTypes from 'prop-types'
import { FaChevronLeft } from 'react-icons/fa';
import {
    useHistory,
} from "react-router-dom";
//local files 
import "./Navbar.css"
//logoUrl
import logoUrl from "../../constant/logoUrl"
//components
import RouterButton from "./RouterButton"

function Navbar({ backButtonVisibility = false }) {
    const history = useHistory();
    //go back page
    const goBack = () => history.goBack();

    return (
        <div className={"header"}>
            <div className="title-container">
                {
                    backButtonVisibility === true ? (
                        <button onClick={goBack} className="nav-button">
                            <FaChevronLeft size={"1.9em"} color="red" />
                        </button>
                    ) : (<div className="hidden-box"></div>)
                }
                <img src={logoUrl} height={"45rem"} className="logo" alt="logo" />
                <div className="hidden-box"></div>
            </div>
            <div className="router-container">
                <RouterButton path="/" name={"Characters"} />
                <RouterButton path="/comics" name={"Comics"} />
            </div>
        </div>
    )
}

Navbar.propTypes = {
    backButtonVisibility: PropTypes.bool,
}

export default Navbar

