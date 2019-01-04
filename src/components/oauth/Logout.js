import React, { Component } from 'react';
import { AuthService } from '../../service/AuthService'

export default class logout extends Component {

    constructor (props) {
        super(props)
        this.state = {
            authService : new AuthService()
        }
    }

    componentWillMount () {
        this.logOut()
    }

    logOut() {
        this.state.authService.logOut()
    }

    render() {
        return (
            <section className="hero is-dark">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title">
                            You have logged out.
                        </h1>
                    </div>
                </div>
            </section>
        );
    }
}