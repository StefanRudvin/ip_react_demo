import React, { Component } from 'react';
import {IPService} from "../../service/IPService";
import {OauthSender} from "react-oauth-flow";

export default class SendToIP extends Component {

    constructor(props) {
        super(props)
        this.state = {
            service: new IPService()
        }
    }

    buildAuthUrl () {
        console.log(this.state.service.getAuthUrl());
        return this.state.service.getAuthUrl();
    }

    render() {
        return (
            <section className="hero is-dark">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title">
                            Login
                        </h1>
                        <a href={this.buildAuthUrl()} className="button is-link">Connect to IntelligentPlant</a>
                    </div>
                </div>
            </section>
        );
    }
}