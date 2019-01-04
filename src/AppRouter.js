import { BrowserRouter as Router, Route, } from "react-router-dom";
import ReceiveFromIP from './components/oauth/Receiver'
import RealTime from './components/views/RealTime'
import GraphView from './components/views/Graphs'
import SendToIP from './components/oauth/Sender'
import Profile from './components/views/Profile'
import Welcome from './components/views/Welcome'
import NavBar from './components/common/NavBar'
import Footer from './components/common/Footer'
import Logout from './components/oauth/Logout'
import React from "react";

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