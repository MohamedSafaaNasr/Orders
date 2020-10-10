import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Orders from "./Orders";
import Login from "./Login";
import Register from "./Register";
import ResetPassword from "./ResetPassword";
import ForgetPassword from "./ForgetPassword";

//protected route
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem("user-auth") != null ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

export default class routes extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleEvent = this.handleEvent.bind(this);
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.name !== this.state.name) {
      this.handler();
    }
  }

  componentWillUnmount() {}

  // Prototype methods, Bind in Constructor (ES2015)
  handleEvent() {}

  // Class Properties (Stage 3 Proposal)
  handler = () => {
    this.setState();
  };

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path="/" component={Orders} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/forget_password" component={ForgetPassword} />
          <Route exact path="/reset_password" component={ResetPassword} />
        </Switch>
      </BrowserRouter>
    );
  }
}
