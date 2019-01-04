import React, { Component } from 'react'
import axios from 'axios'
import qs from 'qs'
import { AuthService } from '../../service/AuthService'

export default class ReceiveFromIP extends Component {

    constructor (props) {
        super(props)
        this.state = {
            isAuthenticated: false,
        }
    }

    componentWillMount () {
        if (AuthService.isLoggedIn()) {
            this.setState({isAuthenticated: true})
        } else {
            this.fetchToken()
        }
    }

    fetchToken () {
        let self = this

        const url = process.env.REACT_APP_IP_BASE_URL + process.env.REACT_APP_IP_TOKEN_URL
        const data = {
            code: window.location.search.slice(6),
            grant_type: 'authorization_code',
            client_id: 'cf8ea8f610404652be1d3f61a459b1c9',
            client_secret: 'tMpJf/JwlddzQSzfuPr1cBDfTvRCMN2VdzzabfSO6bk=',
            redirect_uri: 'http://localhost:3000/receive',
            scope: 'UserInfo DataRead AccountDebit'
        }
        const options = {
            method: 'POST',
            headers: {'content-type': 'application/x-www-form-urlencoded'},
            data: qs.stringify(data),
            url
        }
        axios(options).then((res) => {
            self.setState({isAuthenticated: true})
            ReceiveFromIP.saveToken(res.data.access_token, self)
        })
    }

    static saveToken (token, self) {
        AuthService.logIn(token)
    }

    render () {
        const isAuthenticated = this.state.isAuthenticated
        let message

        if (isAuthenticated) {
            message = (
                <div>
                    You have logged in!
                </div>
            )
        } else {
            message = (
                <div>
                    Authenticating...
                </div>
            )
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
        )
    }
}