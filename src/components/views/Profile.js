import React, { Component } from 'react'
import { IPService } from '../../service/IPService'

export default class Profile extends Component {

    constructor (props) {
        super(props)
        this.state = {
            dataSources: [],
            user: {
                picture: '',
                verifiedEmail: true,
                id: 'XXX',
                link: 'XXX',
                verifiedEmail: 'XXX',
                email: 'XXX',
                locale: 'XXX'
            },
            service: new IPService()
        }
    }

    componentDidMount () {
        let self = this
        this.state.service.getUserInfo((res) => self.setState({user: JSON.parse(res)}))
        this.state.service.getDataSources((res) => self.setState({dataSources: res}))
    }

    render () {
        const dataSourceItems = this.state.dataSources.map((source) =>
            <li key={source.Name.DisplayName}>
                <p><b>{source.Name.DisplayName}</b></p>
                <p>Uptime: {source.Status.Uptime}</p>
                <p>RunningStatus: {source.Status.RunningStatus}</p>
                <p>SupportedFeatures:
                    {source.SupportedFeatures}
                    </p>
            </li>
        );

        return (
            <div>
                <section className="hero is-dark">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title">
                                User Profile
                            </h1>
                            <h2 className="subtitle">
                                Your user information
                            </h2>
                        </div>
                    </div>
                </section>

                <div className="columns">
                    <div className="container is-fluid is-one-third">
                        <div className="notification">
                            <figure className="image is-128x128 is-flex is-centered">
                                <img alt="" src={this.state.user.picture}/>
                            </figure>
                            <p>
                                Name: {this.state.user.name}
                            </p>
                            <p>
                                Email: {this.state.user.email}
                            </p>
                            <p>
                                ID: {this.state.user.id}
                            </p>
                            <p>
                                Locale: {this.state.user.locale}
                            </p>
                            <p>
                                Verified: {this.state.user.verifiedEmail}
                            </p>
                            <p>
                                Link: {this.state.user.link}
                            </p>
                        </div>
                    </div>
                    <div className="container is-fluid">
                        <div className="notification">
                            <ul>
                                {dataSourceItems}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}