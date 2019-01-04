import { IPService } from '../service/IPService'
import React, { Component } from 'react'
import { Line } from 'react-chartjs-2'
import moment from 'moment'

export default class Graphs extends Component {

    constructor (props) {
        super(props)
        this.state = {
            service: new IPService(),
            dataSources: [],
            currentTagName: '',
            currentSourceName: '',
            currentSourceData: [],
            historicalData: [],
            sourceDropdownOpen: false,
            tagDropdownOpen: false,
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
        this.state.service.getDataSources((res) => self.setState({dataSources: res}))
    }

    toggleSourceDropDown () { this.setState({sourceDropdownOpen: !this.state.sourceDropdownOpen}) }

    toggleTagDropDown () { this.setState({tagDropdownOpen: !this.state.tagDropdownOpen}) }

    setAndGetCurrentSourceData (qualifiedName) {
        this.setState({currentSourceName: qualifiedName})
        this.getCurrentSourceData(qualifiedName)
        this.toggleSourceDropDown()
    }

    setAndGetCurrentTagData (tagName) {
        this.toggleTagDropDown()

        this.setState({
            currentTagName: tagName
        }, () => {
            this.getHistoricalData()
        })
    }

    getCurrentSourceData (qualifiedName) {
        let self = this
        this.state.service.getDataSource(qualifiedName, (res) => self.setState({currentSourceData: res}))
    }

    getHistoricalData () {
        let self = this
        this.state.service.getHistoricalData(self.state.currentSourceName, self.state.currentTagName, (res) => {
            self.setState({historicalData: res})
            self.processChartData()
        })
    }

    processChartData () {
        let data = {}
        data.labels = []
        data.datasets = []

        let dataSet = []
        dataSet.data = []
        dataSet.label = this.state.currentSourceName

        dataSet.borderColor = []
        dataSet.borderColor.push('green')
        dataSet.borderWidth = 1

        let historicalData = this.state.historicalData

        let firstChild = historicalData[Object.keys(historicalData)[0]]
        let secondChild = firstChild[Object.keys(firstChild)[0]]
        let values = secondChild.Values

        values.forEach(function (value) {
            data.labels.push(moment(value.UtcSampleTime).format('ddd, hA'))
            dataSet.data.push(value.NumericValue)
        })

        data.datasets.push(dataSet)
        this.setState({data: data})
    }

    render () {
        const datasourceItems = this.state.dataSources.map((source) =>
            <div key={source.Name.QualifiedName}>
                <a onClick={() => this.setAndGetCurrentSourceData(source.Name.QualifiedName)} className="dropdown-item">
                    {source.Name.QualifiedName}
                </a>
                <hr className="dropdown-divider"/>
            </div>
        )

        const tagItems = this.state.currentSourceData.map((tag) =>
            <div key={tag.Id}>
                <a onClick={() => this.setAndGetCurrentTagData(tag.Id)} className="dropdown-item">
                    {tag.Id}
                </a>
                <hr className="dropdown-divider"/>
            </div>
        )

        return (
            <div className="columns">
                <div className="container">
                    <div className="notification graph">
                        <h1>Graph of last week</h1>
                        <Line data={this.state.data} options={this.state.options} width={800} height={300}/>
                        <h1>Choose Data</h1>

                        <div className={this.state.sourceDropdownOpen === true ? 'dropdown is-active' : 'dropdown'}>
                            <div className="dropdown-trigger">
                                <button className="button" onClick={this.toggleSourceDropDown.bind(this)}
                                        aria-haspopup="true" aria-controls="dropdown-menu2">
                                    <span>{this.state.currentSourceName === '' ? 'Select DataSource' : this.state.currentSourceName}</span>
                                    <span className="icon is-small">
                                            <i className="fa fa-angle-down" aria-hidden="true"/>
                                        </span>
                                </button>
                            </div>
                            <div className="dropdown-menu" id="dropdown-menu2" role="menu">
                                <div className="dropdown-content">
                                    {datasourceItems}
                                </div>
                            </div>
                        </div>

                        <div className={this.state.tagDropdownOpen === true ? 'dropdown is-active' : 'dropdown'}>
                            <div className="dropdown-trigger">
                                <button className="button" onClick={this.toggleTagDropDown.bind(this)}
                                        aria-haspopup="true" aria-controls="dropdown-menu2">
                                    <span>{this.state.currentTagName === '' ? 'Select Tag' : this.state.currentTagName}</span>
                                    <span className="icon is-small">
                                            <i className="fa fa-angle-down" aria-hidden="true"/>
                                        </span>
                                </button>
                            </div>
                            <div className="dropdown-menu" id="dropdown-menu2" role="menu">
                                <div className="dropdown-content">
                                    {tagItems}
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        )
    }
}