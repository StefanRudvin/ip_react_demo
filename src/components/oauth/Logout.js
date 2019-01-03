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
            <div>
                <h1>You have successfully been logged out.</h1>
            </div>
        );
    }
}