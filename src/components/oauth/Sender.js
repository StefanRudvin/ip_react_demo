import { OauthSender } from 'react-oauth-flow';
import React, { Component } from 'react';

export default class SendToIP extends Component {
    render() {
        return (
            <section className="hero is-dark">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title">
                            Login
                        </h1>
                        <OauthSender
                            authorizeUrl={process.env.REACT_APP_IP_BASE_URL + process.env.REACT_APP_IP_AUTH_URL}
                            clientId={encodeURIComponent(process.env.REACT_APP_CLIENT_ID)}
                            redirectUri={process.env.REACT_APP_API_URL + 'receive'}
                            args={{
                                'scope':
                                    'UserInfo DataRead AccountDebit'
                            }}
                            render={({ url }) => <a href={url} className="button is-link">Connect to IntelligentPlant</a>}
                        />
                    </div>
                </div>
            </section>
        );
    }
}