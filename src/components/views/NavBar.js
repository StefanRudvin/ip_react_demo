import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class NavBar extends Component {
    getPathParam() {
        return window.location.pathname.slice(1)
    }
    render() {
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
                                    <li className={this.getPathParam() === "" ? "is-active" : ""}><Link to="/">Home</Link></li>
                                    <li className={this.getPathParam() === "graph" ? "is-active" : ""}><Link to="/graph">Graph</Link></li>
                                    <li className={this.getPathParam() === "login" ? "is-active" : ""}><Link to="/login">Login</Link></li>
                                    <li className={this.getPathParam() === "receive" ? "is-active" : ""}><Link to="/receive">Receive</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        );
    }
}