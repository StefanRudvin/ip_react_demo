import React, { Component } from 'react'

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
                                <br/>
                                <p>
                                    This is an example React App made with the <a
                                    href="https://appstore.intelligentplant.com/" className="button is-success" >IntelligentPlant Appstore</a>
                                </p>
                                <br/>
                                <p>
                                    <a href="https://github.com/intelligentplant" className="button is-link">IntelligentPlant GitHub</a>
                                </p>
                            </h2>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}