import React, { Component } from 'react'

import Graph from '../Graph'

export default class GraphView extends Component {

    render () {
        return (
            <div>
                <section className="hero is-dark">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title">
                                Graph
                            </h1>
                            <h2 className="subtitle">
                                Your datasource information
                            </h2>
                        </div>
                    </div>
                </section>

                <Graph />
                <Graph />
                <Graph />
                <Graph />
            </div>
        )
    }
}