import React, { Component } from 'react';
import { OauthSender } from 'react-oauth-flow';

export default class SendToIP extends Component {
    render() {
        return (
            <OauthSender
                authorizeUrl={process.env.REACT_APP_IP_BASE_URL + process.env.REACT_APP_IP_AUTH_URL}
                clientId={encodeURIComponent(process.env.REACT_APP_CLIENT_ID)}
                redirectUri={process.env.REACT_APP_API_URL + 'receive'}
                // state={{ from: '/' }}
                args={{
                    'scope':
                        'UserInfo DataRead AccountDebit'
                }}
                render={({ url }) => <a href={url} className="button is-link">Connect to IntelligentPlant</a>}
            />
        );
    }
}