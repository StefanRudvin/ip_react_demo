import React, { Component } from 'react';
import './css/App.scss';
import AppRouter from './appRouter'
import 'bulma/css/bulma.css'
import './service/TokenInterceptor'

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
