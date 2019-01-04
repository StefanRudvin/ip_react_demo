import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { AuthService } from '../../service/AuthService'
import EventEmitter from '../../service/EventEmitter'

export default class LoginListItem extends Component {

    constructor (props) {
        super(props)
        this.state = {
            isAuthenticated : false
        }
    }

    checkAuth() {
        this.setState({isAuthenticated: AuthService.isLoggedIn()})
    }

    componentDidMount () {
        this.checkAuth()
        EventEmitter.on('onAuthChange', () => {
            this.checkAuth()
        })
    }

    render() {
        let loginChoice = null;

        if (this.state.isAuthenticated) {
            loginChoice = (
                <Link to="/logout">Logout</Link>
            );
        } else {
            loginChoice = (
                <Link to="/login">Login</Link>
            )
        }

        return (
            <div>
                {loginChoice}
            </div>
        );
    }
}