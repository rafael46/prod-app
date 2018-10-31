import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Home2 from "./components/Home2"
import NotFound from "./containers/NotFound";
import AppliedRoute from "./components/AppliedRoute"
import NewContact from "./containers/NewContact"
import EditContact from "./containers/EditContact"
import ContactsHome from "./containers/Home"
import NewSO from "./containers/SalesOrders/SalesOrderNew"

export default ({childProps}) =>
  <Switch>
    <Route path="/" exact component={Home2} />
    {/* new routes */}
    <AppliedRoute path="/" exact component={Home2} props={childProps} />
    <AppliedRoute path="/todo/new" exact component={NewContact} props={childProps} />
    <AppliedRoute path="/todo/:id" exact component={EditContact} props={childProps} />
    <AppliedRoute path="/todo/" exact component={ContactsHome} props={childProps} />
    <AppliedRoute path="/so/new" exact component={NewSO} props={childProps}/>
    
    {/* <AppliedRoute path="/todos/:cName" exact component={Contacts} props={childProps} /> */}

    {/* <AppliedRoute path="/login" exact component={Login} props={childProps} /> */}
    {/* Finally, catch all unmatched route */}
    <Route component = {NotFound}/>
  </Switch>;

