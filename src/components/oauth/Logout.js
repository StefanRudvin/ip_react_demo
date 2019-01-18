import { AuthService } from '../../service/AuthService'
import React, { Component } from 'react';

export default class logout extends Component {

    constructor (props) {
        super(props)
        this.state = {
        }
    }

    componentWillMount () {
        this.logOut()
    }

    logOut() {
        AuthService.logOut()
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