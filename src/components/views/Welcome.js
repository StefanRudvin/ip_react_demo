import React, { Component } from 'react'
import { IPService } from '../../service/IPService'

export default class Profile extends Component {
    render () {
        return (
            <div>
                <section className="hero is-dark">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title">
                                Welcome!
                            </h1>
                            <h2 className="subtitle">
                                Please Login:
                                XXXX
                            </h2>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}