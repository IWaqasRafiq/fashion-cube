import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { registerNav } from "../modules/Navigation";
import { createBrowserHistory } from "history";
import PageNotFound from "../views/PageNotFound";
import HomeRoutes from "./HomeRoutes";
import PrivateRoutes from "./PrivateRoutes";
import Auth from "../modules/Auth";

const PrivateRouter = ({ component: Component, ...options }) => {
  return Auth.getUserDetails() && Auth.getToken() ? (
    <Route {...options} element={<Component />} />
  ) : (
    <Navigate to="/PageNotFound" />
  );
};

class AppRoutes extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const browserHistory = createBrowserHistory();

    return (
      <div>
        <Router ref={registerNav}>
          <Routes>
            {HomeRoutes.map((homeRoute, index) => (
              <Route
                key={index}
                path={homeRoute.path}
                exact={homeRoute.exact}
                element={
                  <homeRoute.layout>
                    <homeRoute.component />
                  </homeRoute.layout>
                }
              />
            ))}
            {PrivateRoutes.map((privateRoute, index) => (
              <PrivateRouter
                key={index}
                path={privateRoute.path}
                exact={privateRoute.exact}
                component={privateRoute.component}
              />
            ))}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default AppRoutes;
