import React, {Component} from 'react';
import {hubConnection} from 'signalr-no-jquery';
import {AuthService} from '../../service/AuthService';
import {IPService} from '../../service/IPService';
import swal from 'sweetalert';

export default class RealTime extends Component {

    constructor(props) {
        super(props);
        this.state = {
            service: new IPService(),
            token: '',
            dataSources: [],
            currentTagName: 'Head',
            currentSourceName: 'IP Datasource',
            currentSourceData: [],
            historicalData: [],
            sourceDropdownOpen: false,
            tagDropdownOpen: false,
        };
    }

    componentWillMount() {
        this.setState({token: AuthService.getToken()});

        let self = this;
        this.state.service.getDataSources((res) => self.setState({dataSources: res}));

        this.getCurrentSourceData(this.state.currentSourceName);
    }

    toggleSourceDropDown() {
        this.setState({sourceDropdownOpen: !this.state.sourceDropdownOpen});
    }

    toggleTagDropDown() {
        this.setState({tagDropdownOpen: !this.state.tagDropdownOpen});
    }

    setAndGetCurrentSourceData(qualifiedName) {
        this.setState({currentSourceName: qualifiedName});
        this.setState({currentTagName: ""});
        this.getCurrentSourceData(qualifiedName);
        this.toggleSourceDropDown();
    }

    setAndGetCurrentTagData(tagName) {
        this.toggleTagDropDown();

        this.setState({
            currentTagName: tagName
        }, () => {
            this.refreshSignalR();
        });
    }

    getCurrentSourceData(qualifiedName) {
        let self = this;
        this.state.service.getDataSource(qualifiedName, (res) => self.setState({currentSourceData: res}));
    }

    refreshSignalR() {
        let self = this;
        let options = {
            'EnableJSONP': true,
            'HubConfiguration': true
        };

        const connection = hubConnection('https://appstore.intelligentplant.com/gestalt/', options);
        const hubProxy = connection.createHubProxy('realTimeDataHub');

        connection.url = 'https://appstore.intelligentplant.com/gestalt/signalr';
        connection.qs = {'access_token': this.state.token};

        hubProxy.on('valuesReceived', function (sourceName, tagValues) {
            console.log(sourceName);
            console.log(tagValues);
            swal("New real time value for " + sourceName + ":", tagValues[0].TextValue);
        });

        connection.start({json: true})
            .done(function () {
                console.log('Now connected, connection ID=' + connection.id);
                self.invokeServerMethods(self, hubProxy);
            })
            .fail(function (error) {
                console.log('Could not connect' + error);
            });
    }

    invokeServerMethods(self, hubProxy) {
        hubProxy.invoke('CreateSubscription', self.state.currentSourceName, '00:00:10').done(function () {
            console.log('Invocation of CreateSubscription succeeded');
        }).fail(function (error) {
            console.log('Invocation of CreateSubscription failed. Error: ' + error);
        });

        hubProxy.invoke('AddTagsToSubscription', 'IP Datasource',
            {
                [self.state.currentSourceName]: [
                    self.state.currentTagName
                ]
            }
        ).done(function () {
            console.log('Invocation of AddTagsToSubscription succeeded');
        }).fail(function (error) {
            console.log('Invocation of AddTagsToSubscription failed. Error: ' + error);
        });
    }

    componentDidMount() {
        this.refreshSignalR();
    }

    render() {

        const datasourceItems = this.state.dataSources.map((source) =>
            <div key={source.Name.QualifiedName}>
                <a onClick={() => this.setAndGetCurrentSourceData(source.Name.QualifiedName)} className="dropdown-item">
                    {source.Name.QualifiedName}
                </a>
                <hr className="dropdown-divider"/>
            </div>
        );

        const tagItems = this.state.currentSourceData.map((tag) =>
            <div key={tag.Id}>
                <a onClick={() => this.setAndGetCurrentTagData(tag.Id)} className="dropdown-item">
                    {tag.Id}
                </a>
                <hr className="dropdown-divider"/>
            </div>
        );

        return (
            <div>
                <section className="hero is-dark">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title">
                                Realtime
                            </h1>
                            <h2 className="subtitle">
                                <br/>
                                <p>
                                    Realtime data from selected source via <a
                                    href="https://www.asp.net/signalr" className="button is-success">SignalR</a>
                                </p>
                                <br/>
                            </h2>
                        </div>

                        <div className="container">
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
                </section>
            </div>
        );
    }
}