import React from 'react'
import PropTypes from 'prop-types'
import { FaSearch, FaChevronLeft } from 'react-icons/fa';
//local files 
import "./Navbar.css"
//logoUrl
import logoUrl from "../../constant/logoUrl"

function Navbar({ backButtonVisibility = false, backAction, searchAction }) {
    return (
        <div className={"header"}>
            {
                backButtonVisibility === true ? (
                    <button onClick={backAction} className="nav-button">
                        <FaChevronLeft size={"1.9em"} color="red" />
                    </button>
                ) : (<div className="hidden-box"></div>)
            }
            <img src={logoUrl} height={"45rem"} className="logo" alt="logo" />
            <button className="nav-button" onClick={searchAction}>
                <FaSearch size={"1.9em"} color="red" />
            </button>
        </div>
    )
}

Navbar.propTypes = {
    backButtonVisibility: PropTypes.bool,
    backAction: PropTypes.func,
    searchAction: PropTypes.func
}

export default Navbar

