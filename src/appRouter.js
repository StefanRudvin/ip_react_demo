import { BrowserRouter as Router, Route, } from "react-router-dom";
import ReceiveFromIP from './components/oauth/Receiver'
import GraphView from './components/views/Graphs'
import SendToIP from './components/oauth/Sender'
import NavBar from './components/common/NavBar'
import Footer from './components/common/Footer'
import Profile from './components/views/Profile'
import Welcome from './components/views/Welcome'
import Logout from './components/oauth/Logout'
import React from "react";
import RealTime from './components/views/RealTime'

const AppRouter = () => (
    <Router>
        <div>
            <NavBar/>
            <Route exact path="/receive" component={ReceiveFromIP} />
            <Route path="/realtime" component={RealTime} />
            <Route path="/graph" component={GraphView} />
            <Route path="/profile" component={Profile} />
            <Route path="/login" component={SendToIP} />
            <Route path="/logout" component={Logout} />
            <Route exact path="/" component={Welcome} />
            <Footer/>
        </div>
    </Router>
);

export default AppRouter;