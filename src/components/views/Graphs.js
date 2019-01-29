import React, {Component} from 'react';
import Graph from '../Graph';

export default class GraphView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            graphs: [
                {id: 1, name: 'Graph 1'},
                {id: 2, name: 'Graph 2'},
                {id: 3, name: 'Graph 3'}
            ]
        };
    }

    addGraph() {
        let graphsSize = this.state.graphs.length + 1;
        let graphsAppended = this.state.graphs;
        graphsAppended.push({id: graphsSize, name: "Graph " + graphsSize});
        this.setState({graphs: graphsAppended});
    }

    render() {
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
                {
                    this.state.graphs.map((graph) => (
                        <Graph key={graph.id} name={graph.name}/>
                    ))
                }
                <div className="button is-success" onClick={this.addGraph.bind(this)}>Add Graph</div>
            </div>
        );
    }
}