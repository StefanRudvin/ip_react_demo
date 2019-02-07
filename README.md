## IntelligentPlant React Demo

This is an application built to act as a starting point for [Intelligent Plant](https://appstore.intelligentplant.com/) applications built with [React](https://reactjs.org/).

It uses the [Intelligent Plant API Module](https://github.com/intelligentplant/js-app-store-api) to fetch user data, datasources and tags. Real-time data is handled via SignalR.

The auth token is stored in local storage, which to be moved elsewhere for production due to security concerns.

## Installation:

* Start by creating a new developer account at https://appstore.intelligentplant.com/, and fetching your `CLIENT_ID` and `CLIENT_SECRET`

* Copy your IntelligentPlant `CLIENT_ID` and `CLIENT_SECRET` to `.env.example` and rename it to `.env`

* Add `http://localhost:3000/receive` to your Authorized Redirect Urls in your IntelligentPlant application

* `npm install`

* `npm start`


![Screenshot](https://github.com/intelligentplant/ip_react_demo/blob/master/src/assets/App-screenshot.png)
