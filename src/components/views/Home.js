import React, { Component } from 'react'
import axios from 'axios'

export default class Home extends Component {

    constructor (props) {
        super(props)
        this.state = {
            data_sources: [],
            user: {
                picture: '',
                verified_email: true
            },
            data: {}
        }
    }

    componentWillMount () {
        let self = this
        axios.get(process.env.REACT_APP_INFO_URL)
            .then(function (response) {
                self.setState({user: JSON.parse(response.data.InfoAll)})
                console.log(self.state.user)
            })

        axios.get(process.env.REACT_APP_DATASOURCES_URL)
            .then(function (response) {
                self.setState({data_sources: response.data})
                self.getData()
            })
    }

    getData() {
        let self = this
        axios.post(
            "https://appstore.intelligentplant.com/gestalt/api/data/tags/" + this.state.data_sources[0].Name.QualifiedName,
            {
                "pageSize": 10,
                "page": 1,
                "name": "*"
            })
            .then(function (response) {
                self.setState({data: response.data})
                console.log(self.state.data_sources)
            })

    }

    render () {

        const datasource_items = this.state.data_sources.map((source) =>
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
                                Verified: {this.state.user.verified_email}
                            </p>
                            <p>
                                Link: {this.state.user.link}
                            </p>
                        </div>
                    </div>
                    <div className="container is-fluid">
                        <div className="notification">
                            <ul>
                                {datasource_items}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}