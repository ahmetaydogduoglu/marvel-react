import React, { Component } from 'react'
import PropTypes from 'prop-types'
//local files
import "./Comics.css";
//Navbar
import Navbar from "../components/Navbar/Navbar";
//components
import ComicsMapping from "../components/Lists/ComicsMapping";
import Loading from "../components/loading";
//services
import { getComics } from "../services/getComics";

class Comics extends Component {

    constructor(props) {
        super(props);
        this.state = {
            comics: null,
            dataLoding: true
        }
    }

    onGetComics() {
        this.setState({
            dataLoading: true
        })
        getComics("&limit=16").then(content => {
            this.setState({
                dataLoading: false,
                comics: content.data.results
            })
        }).catch(err => {
            alert(err.message);
        })
    }

    //getComics
    componentDidMount() {
        this.onGetComics();
    }

    render() {
        return (
            <>
                <Navbar />
                <div className="comics-container">
                    {
                        this.state.comics === null ? (
                            <Loading message="Comics " />
                        ) : (
                                <div className="comics-list-container">
                                    <ComicsMapping data={this.state.comics} />
                                </div>
                            )
                    }
                </div>
            </>
        )
    }
}

export default Comics

