import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import AppliedRoute from "./components/AppliedRoute"
import NewContact from "./containers/NewContact"


export default ({childProps}) =>
  <Switch>
    <Route path="/" exact component={Home} />
    {/* new routes */}
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <AppliedRoute path="/todo/new" exact component={NewContact} props={childProps} />
    {/* <AppliedRoute path="/todos/:cName" exact component={Contacts} props={childProps} /> */}

    {/* <AppliedRoute path="/login" exact component={Login} props={childProps} /> */}
    {/* Finally, catch all unmatched route */}
    <Route component = {NotFound}/>
  </Switch>;

