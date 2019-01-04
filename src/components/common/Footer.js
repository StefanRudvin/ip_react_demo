import React, { Component } from 'react'
import logo from './../../assets/appstore.png'

export default class Footer extends Component {
    render () {
        return (
            <div className="hero-foot footer-custom">
                <div className="container has-text-centered">
                    <hr/>
                    <p>
                        <img src={logo} className="logo"/>
                    </p>
                </div>
            </div>
        )
    }
}