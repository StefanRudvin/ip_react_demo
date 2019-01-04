import React, { Component } from 'react';
import { AuthService } from '../../service/AuthService'

export default class logout extends Component {

    constructor (props) {
        super(props)
        this.state = {
        }
    }

    componentWillMount () {
        this.logOut()
    }

    static logOut() {
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