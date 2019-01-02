import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'
import { Line } from 'react-chartjs-2'

export default class Graph extends Component {

    constructor (props) {
        super(props)
        this.state = {
            data_sources: [],
            current_tag_name: '',
            current_source_name: '',
            current_source_data: [],
            historical_data: [],
            source_dropdown_open: false,
            tag_dropdown_open: false,
            options: {
                legend: {
                    display: false
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            },
            data: {
                labels: [],
                datasets: [{
                    label: '',
                    data: []
                },
                ]
            }
        }
    }

    componentWillMount () {
        let self = this

        axios.get(process.env.REACT_APP_DATASOURCES_URL)
            .then(function (response) {
                self.setState({data_sources: response.data})
            })
    }

    toggleSourceDropDown () {
        this.setState({source_dropdown_open: !this.state.source_dropdown_open})
    }

    toggleTagDropDown () {
        this.setState({tag_dropdown_open: !this.state.tag_dropdown_open})
    }

    setAndGetCurrentSourceData (qualifiedName) {
        console.log(qualifiedName)
        this.setState({current_source_name: qualifiedName})
        this.getCurrentSourceData(qualifiedName)
        this.toggleSourceDropDown()
    }

    setAndGetCurrentTagData (tagName) {
        console.log(tagName)
        this.toggleTagDropDown()

        this.setState({
            current_tag_name: tagName
        }, () => {
            this.getHistoricalData()
        })
    }

    getCurrentSourceData (qualifiedName) {
        let self = this
        axios.post(
            'https://appstore.intelligentplant.com/gestalt/api/data/tags/' + qualifiedName,
            {
                'pageSize': 10,
                'page': 1,
                'name': '*'
            })
            .then(function (response) {
                self.setState({current_source_data: response.data})
                console.log(response.data)
            })
    }

    getHistoricalData () {
        let self = this

        axios.post(
            'https://appstore.intelligentplant.com/gestalt/api/data/v2/history',
            {
                'tags': {
                    [self.state.current_source_name]: [
                        self.state.current_tag_name
                    ],
                },
                'dataFunction': 'AVG',
                'StartTime': '*-7d',
                'EndTime': '*',
                'sampleInterval': '12h'
            })
            .then(function (response) {
                self.setState({historical_data: response.data})
                self.processChartData(response.data)
            })
    }

    processChartData () {
        let data = {}
        data.labels = []
        data.datasets = []

        let dataset = []
        dataset.data = []
        dataset.label = this.state.current_source_name

        dataset.borderColor = []
        dataset.borderColor.push('crimson')
        dataset.borderWidth = 1

        let historical_data = this.state.historical_data

        console.log(historical_data[Object.keys(historical_data)[0]])

        let next_step = historical_data[Object.keys(historical_data)[0]]
        let wazaa = next_step[Object.keys(next_step)[0]]
        let values = wazaa.Values

        console.log('Values:')
        console.log(values)

        values.forEach(function (value) {
            data.labels.push(moment(value.UtcSampleTime).format('ddd, hA'))
            dataset.data.push(value.NumericValue)
        })
        console.log(dataset)
        data.datasets.push(dataset)

        this.setState({data: data})
    }

    render () {
        const datasource_items = this.state.data_sources.map((source) =>
            <div>
                <a onClick={() => this.setAndGetCurrentSourceData(source.Name.QualifiedName)} className="dropdown-item">
                    {source.Name.QualifiedName}
                </a>
                <hr className="dropdown-divider"/>
            </div>
        )

        const tag_items = this.state.current_source_data.map((tag) =>
            <div>
                <a onClick={() => this.setAndGetCurrentTagData(tag.Id)} className="dropdown-item">
                    {tag.Id}
                </a>
                <hr className="dropdown-divider"/>
            </div>
        )

        return (
            <div className="columns">
                <div className="container is-fluid">
                    <div className="notification">
                        <h1>Choose Data</h1>

                        <div className={this.state.source_dropdown_open === true ? 'dropdown is-active' : 'dropdown'}>
                            <div className="dropdown-trigger">
                                <button className="button" onClick={this.toggleSourceDropDown.bind(this)}
                                        aria-haspopup="true" aria-controls="dropdown-menu2">
                                    <span>{this.state.current_source_name === '' ? 'Select DataSource' : this.state.current_source_name}</span>
                                    <span className="icon is-small">
                                            <i className="fa fa-angle-down" aria-hidden="true"/>
                                        </span>
                                </button>
                            </div>
                            <div className="dropdown-menu" id="dropdown-menu2" role="menu">
                                <div className="dropdown-content">
                                    {datasource_items}
                                </div>
                            </div>
                        </div>

                        <div className={this.state.tag_dropdown_open === true ? 'dropdown is-active' : 'dropdown'}>
                            <div className="dropdown-trigger">
                                <button className="button" onClick={this.toggleTagDropDown.bind(this)}
                                        aria-haspopup="true" aria-controls="dropdown-menu2">
                                    <span>{this.state.current_tag_name === '' ? 'Select Tag' : this.state.current_tag_name}</span>
                                    <span className="icon is-small">
                                            <i className="fa fa-angle-down" aria-hidden="true"/>
                                        </span>
                                </button>
                            </div>
                            <div className="dropdown-menu" id="dropdown-menu2" role="menu">
                                <div className="dropdown-content">
                                    {tag_items}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container is-fluid">
                    <div className="notification">
                        <h1>Graph of last week</h1>
                    </div>
                    <Line data={this.state.data} options={this.state.options} width={800} height={300}/>
                </div>
            </div>
        )
    }
}