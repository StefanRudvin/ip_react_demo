import { createOauthFlow } from 'react-oauth-flow';

const { Sender, Receiver } = createOauthFlow({
    authorizeUrl: 'https://appstore.intelligentplant.com/AuthorizationServer/OAuth/Authorize',
    tokenUrl: process.env.REACT_APP_TOKEN_URL,
    redirectUri: process.env.REACT_APP_API_URL + 'receive',
    clientSecret: process.env.REACT_APP_CLIENT_SECRET,
    clientId: process.env.REACT_APP_CLIENT_ID,
});

export { Sender, Receiver };