import axios from 'axios'

// Singleton holder
let _instance = null;

export class IPService {
    constructor() {
        if (_instance) {
            return _instance;
        }
        _instance = this;
        this.userInfo = null;
        this.dataSources = null;
    }

    getUserInfo(callback = null) {
        let self = this;
        axios.get(process.env.REACT_APP_USER_INFO_URL)
            .then(function (response) {
                self.userInfo = response.data.InfoAll
                if (typeof callback === "function") callback(response.data.InfoAll)
            })
    }

    getDataSources(callback = null) {
        let self = this;
        axios.get(process.env.REACT_APP_DATASOURCES_URL)
            .then(function (response) {
                self.dataSources = response.data
                if (typeof callback === "function") callback(response.data)
            })
    }

    getDataSource(dataSource, callback = null) {
        axios.post(process.env.REACT_APP_TAG_URL + dataSource,
            {
                'pageSize': 10,
                'page': 1,
                'name': '*'
            })
            .then(function (response) {
                if (typeof callback === "function") callback(response.data)
            })
    }

    getHistoricalData(dataSource, dataTag, callback = null) {
        // let obj = new
        const query = {
            tags: {
                [dataSource]: [
                    dataTag
                ],
            },
            dataFunction : 'AVG',
            StartTime : '*-7d',
            EndTime : '*',
            sampleInterval : '12h'
        };

        axios.post(process.env.REACT_APP_HISTORICAL_URL, query)
            .then(function (response) {
                if (typeof callback === "function") callback(response.data)
            })
    }
}