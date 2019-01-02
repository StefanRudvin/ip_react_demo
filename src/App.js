import React, { Component } from 'react';
import './App.css';
import AppRouter from './appRouter'
import 'bulma/css/bulma.css'
import axios from 'axios'

// Set token to all requests
axios.interceptors.request.use(function (config) {
    config.headers.authorization = 'Bearer ' + process.env.REACT_APP_IP_TOKEN
    return config
}, function (error) {
    return Promise.reject(error)
})

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppRouter/>
      </div>
    );
  }
}

export default App;
