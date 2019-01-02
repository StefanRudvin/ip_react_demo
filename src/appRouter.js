import { BrowserRouter as Router, Route, } from "react-router-dom";
import ReceiveFromIP from './components/oauth/receiver'
import SendToIP from './components/oauth/sender'
import NavBar from './components/views/NavBar'
import Footer from './components/views/Footer'
import Home from './components/views/Home'
import React from "react";
import GraphView from './components/views/GraphView'

const AppRouter = () => (
    <Router>
        <div>
            <NavBar/>
            <Route exact path="/" component={Home} />
            <Route path="/graph" component={GraphView} />
            <Route path="/login" component={SendToIP} />
            <Route exact path="/receive" component={ReceiveFromIP} />
            <br/>
            <br/>
            <br/>
            <Footer/>
        </div>
    </Router>
);

export default AppRouter;