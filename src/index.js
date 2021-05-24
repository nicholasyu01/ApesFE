import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.js";
import "assets/css/material-dashboard-react.css?v=1.9.0";

// import Register from "./components/auth/Register"
import Login from "./components/auth/Login"
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import store from "./store";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Search from "./views/Search/Search.js"
import Keyywords from "./views/Keywords/Keywords.js"
import Websites from "./views/Websites/Websites.js"

const hist = createBrowserHistory();
// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}
ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      {/* <Route path="/login" component={Login} /> */}
      <Route exact path="/login" component={Login} />
      <Route exact path="/admin" component={Admin} />
      <Route exact path="/admin/dashboard" component={Admin} />
      {/* <Redirect from="/" to="/admin/search" /> */}
      <Route exact path="/admin/search" component={Admin} />
      <Route exact path="/admin/keywords" component={Admin} />
      <Route path="/admin/websites" component={Admin} />

      <Switch>
        <Redirect from="/" to="/admin/search" />
        {/* <PrivateRoute exact path="/admin" component={Admin} /> */}
      </Switch>
    </Router>
  </Provider>
,
  document.getElementById("root")
);
