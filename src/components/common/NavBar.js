import React, { Component } from 'react';
import { Link } from "react-router-dom";
import LoginListItem from './LoginListItem'
import { AuthService } from '../../service/AuthService'
import EventEmitter from '../../service/EventEmitter'

export default class NavBar extends Component {

    constructor (props) {
        super(props)
        this.state = {
            authService : new AuthService(),
            isAuthenticated : false
        }
    }

    static getPathParam() {
        return window.location.pathname.slice(1)
    }

    checkAuth() {
        this.setState({isAuthenticated: this.state.authService.isLoggedIn()})
    }

    componentDidMount () {
        this.checkAuth()
        EventEmitter.on('onAuthChange', () => {
            this.checkAuth()
        })
    }

    render() {
        let ProfileListItem = null;
        let GraphListItem = null;

        if (this.state.isAuthenticated) {
            ProfileListItem = <li className={NavBar.getPathParam() === "profile" ? "is-active" : ""}><Link to="/profile">Profile</Link></li>
            GraphListItem = <li className={NavBar.getPathParam() === "graph" ? "is-active" : ""}><Link to="/graph">Graph</Link></li>
        } else {
            ProfileListItem = null
            GraphListItem = null
        }

        return (
            <div className="hero-head">
                <header>
                    <div className="container">
                        <div className="section">
                            <div className="has-text-centered">
                                <h1 className="title is-1 is-spaced">Intelligent Plant</h1>
                                <h4 className="subtitle is-4">React Demo App</h4>
                            </div>
                        </div>
                        <div className="section">
                            <div className="tabs is-centered">
                                <ul>
                                    <li className={NavBar.getPathParam() === "" ? "is-active" : ""}><Link to="/">Welcome</Link></li>
                                    {ProfileListItem}
                                    {GraphListItem}
                                    <li className={NavBar.getPathParam() === "login" || NavBar.getPathParam() === "receive" ? "is-active" : ""}>
                                        <LoginListItem />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        );
    }
}