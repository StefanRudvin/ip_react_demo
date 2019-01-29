import IntelligentPlantApi from 'intelligentplantnodeapi';

// Singleton holder
let _instance = null;

export class IPService {
    constructor() {
        if (_instance) {
            return _instance;
        }
        _instance = this;

        this.refresh();
    }

    refresh() {
        this.IntelligentPlantApi = new IntelligentPlantApi({
            client_id: process.env.REACT_APP_CLIENT_ID,
            client_secret: process.env.REACT_APP_CLIENT_SECRET,
            grant_type: 'authorization_code',
            redirect_uri: process.env.REACT_APP_API_URL + 'receive',
            scope: 'UserInfo DataRead AccountDebit',
        });
        this.IntelligentPlantApi.set_access_token(localStorage.getItem('token'));
    }

    fetchToken(code, callback = null) {
        this.IntelligentPlantApi.exchange_temporary_token(code, callback);
    }

    getAuthUrl() {
        return this.IntelligentPlantApi.buildAuthURL();
    }

    getUserInfo(callback = null) {
        this.IntelligentPlantApi.getUserInfo((response) => {
            if (typeof callback === "function") callback(response.InfoAll);
        });
    }

    getDataSources(callback = null) {
        this.IntelligentPlantApi.getDataSources((response) => {
            if (typeof callback === "function") callback(response);
        });
    }

    getDataSource(dataSource, callback = null) {
        this.IntelligentPlantApi.getDataSource(dataSource, (response) => {
            if (typeof callback === "function") callback(response);
        });
    }

    getHistoricalData(dataSource, dataTag, callback = null) {
        this.IntelligentPlantApi.getHistoricalData(dataSource, dataTag, (response) => {
            if (typeof callback === "function") callback(response);
        });
    }
}