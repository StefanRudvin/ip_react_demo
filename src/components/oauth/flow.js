import { createOauthFlow } from 'react-oauth-flow';

const { Sender, Receiver } = createOauthFlow({
    authorizeUrl: 'https://appstore.intelligentplant.com/AuthorizationServer/OAuth/Authorize',
    tokenUrl: 'https://appstore.intelligentplant.com/AuthorizationServer/OAuth/Token',
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REACT_APP_API_URL + '/receive',
});

export { Sender, Receiver };