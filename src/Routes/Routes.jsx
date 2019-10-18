import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "../Container/Login"

import Register from "../Container/Register";
import Homes from "../Components/Homes";
import LandingPage from "../Components/LandingPage";

const Routes = () =>{
    return(
        <div>
            <Router>
                <Switch>

                    <Route exact path="/" component={LandingPage}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/chat" component={Homes}/>
                    <Route path="/chat/:id" component={Homes}/>
                </Switch>
            </Router>
        </div>
    )
}

export default Routes;
