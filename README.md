## IntelligentPlant React Demo

This is an application to act as a starting point for [Intelligent Plant](https://appstore.intelligentplant.com/) applications built with [React](https://reactjs.org/).

It uses oAuth to authenticate via Intelligent Plant, and Intelligent Plant APIs to fetch user data, datasources and tags. Real-time data is handled via SignalR.

The current http client is [Axios](https://github.com/axios/axios), but it can be changed at `src/service/IPService`.

## Installation:

* Copy your IntelligentPlant `Client ID` and `Client Secret` to `.env.example` and rename it to `.env`

* `npm install`

* `npm start`
