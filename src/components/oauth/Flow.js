import { createOauthFlow } from 'react-oauth-flow';

const { Sender, Receiver } = createOauthFlow({
    authorizeUrl: 'https://appstore.intelligentplant.com/AuthorizationServer/OAuth/Authorize',
    tokenUrl: 'https://appstore.intelligentplant.com/AuthorizationServer/OAuth/Token',
    redirectUri: process.env.REACT_APP_API_URL + '/receive',
    clientSecret: process.env.CLIENT_SECRET,
    clientId: process.env.CLIENT_ID,
});

export { Sender, Receiver };