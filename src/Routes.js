import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import AppliedRoute from "./components/AppliedRoute"


export default ({childProps}) =>
  <Switch>
    <Route path="/" exact component={Home} />
    {/* new routes */}
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    {/* <AppliedRoute path="/login" exact component={Login} props={childProps} /> */}
    {/* Finally, catch all unmatched route */}
    <Route component = {NotFound}/>
  </Switch>;

