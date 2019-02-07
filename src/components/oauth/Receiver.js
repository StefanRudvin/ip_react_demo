import {AuthService} from '../../service/AuthService';
import React, {Component} from 'react';
import {IPService} from "../../service/IPService";

export default class ReceiveFromIP extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
            service: new IPService()
        };
    }

    componentWillMount() {
        if (AuthService.isLoggedIn()) {
            this.setState({isAuthenticated: true});
        } else {
            this.fetchToken();
        }
    }

    fetchToken() {
        let self = this;
        this.state.service.fetchToken(window.location.search.slice(6), (response) => {
            self.setState({isAuthenticated: true});
            ReceiveFromIP.saveToken(response.access_token);
            self.state.service.refreshToken();
        });

        return;
    }

    static saveToken(token) {
        AuthService.logIn(token);
    }

    render() {
        const isAuthenticated = this.state.isAuthenticated;
        let message;

        if (isAuthenticated) {
            message = (
                <div>
                    You have logged in!
                </div>
            );
        } else {
            message = (
                <div>
                    Authenticating...
                </div>
            );
        }

        return (
            <section className="hero is-dark">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title">
                            {message}
                        </h1>
                    </div>
                </div>
            </section>
        );
    }
}