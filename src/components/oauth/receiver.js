import React, { Component } from 'react';
import { OauthReceiver } from 'react-oauth-flow';

export default class ReceiveFromIP extends Component {
    handleSuccess = async (accessToken, { response, state }) => {
        console.log('Successfully authorized');
        // await setProfileFromDropbox(accessToken);
        // await redirect(state.from);
    };

    handleError = error => {
        console.error('An error occured. heipäti hei');
        console.error(error.message);
    };

    render() {
        return (
            <OauthReceiver
                tokenUrl={process.env.REACT_APP_IP_BASE_URL + process.env.REACT_APP_IP_TOKEN_URL}
                clientId={encodeURIComponent(process.env.REACT_APP_CLIENT_ID)}
                clientSecret={encodeURIComponent(process.env.REACT_APP_CLIENT_SECRET)}
                redirectUri={process.env.REACT_APP_API_URL + 'receive'}
                onAuthSuccess={this.handleSuccess}
                onAuthError={this.handleError}
                args={{
                    'scope': 'UserInfo DataRead AccountDebit'
                }}
                render={({ processing, state, error }) => (
                    <div>
                        {processing && <p>Authorizing now...</p>}
                        {error && (
                            <p className="error">An error occured: {error.message}</p>
                        )}
                    </div>
                )}
            />
        );
    }
}