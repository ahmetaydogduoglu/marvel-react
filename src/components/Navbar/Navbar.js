import React from 'react'
import PropTypes from 'prop-types'
import { FaSearch, FaChevronLeft } from 'react-icons/fa';
import {
    useHistory,
    useLocation
} from "react-router-dom";
//local files 
import "./Navbar.css"
//logoUrl
import logoUrl from "../../constant/logoUrl"

function Navbar({ backButtonVisibility = false }) {
    const history = useHistory();
    const location = useLocation();
    //go back page
    const goBack = () => history.goBack();
    //go search page
    const goSearch = () => {
        if (location.pathname !== "/search") {
            history.push("/search")
        }
    }
    return (
        <div className={"header"}>
            {
                backButtonVisibility === true ? (
                    <button onClick={goBack} className="nav-button">
                        <FaChevronLeft size={"1.9em"} color="red" />
                    </button>
                ) : (<div className="hidden-box"></div>)
            }
            <img src={logoUrl} height={"45rem"} className="logo" alt="logo" />
            <button className="nav-button" onClick={goSearch}>
                <FaSearch size={"1.9em"} color="red" />

            </button>
        </div>
    )
}

Navbar.propTypes = {
    backButtonVisibility: PropTypes.bool,
}

export default Navbar

