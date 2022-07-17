
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./constants/theme";
import { CssBaseline } from "@material-ui/core";
import List from "./pages/request/list";
import { PrivateRoute } from "./router/PrivateRoute";
import history from "./history";
import User from "./pages/user/index";
import Category from "./pages/category/index";
import Department from "./pages/department";
import Statistical from "./pages/statistical";
import ForgotPassword from "./pages/forgotPassword/index";
import ResetPassword from "./pages/resetPassword/index";
import ChangePassword from "./pages/changePassword/index";
import Login from "./pages/login";
import { Provider } from "react-redux";
import configStore from "./redux/store";
import CreateRequest from "./pages/request/create";
import UpdateRequest from "./pages/request/update";
import DetailRequest from "./pages/request/detail";
import React, { useEffect, useState } from "react";
import "./App.css";
import DotLoader from 'react-spinners/DotLoader';
// import GifLoader from 'react-gif-loader';
function App() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    },8000)
  }, [])
  return (
    <div className="App">
      {loading ? (
        <DotLoader size={100} color={'#F37A24'} loading={loading} />
      ) : (
        <Provider store={configStore()}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router history={history}>
              <Switch>
                <PrivateRoute exact path="/">
                  <List />
                </PrivateRoute>
                <Route path="/login">
                  <Login></Login>
                </Route>
                <PrivateRoute path="/create-request">
                  <CreateRequest />
                </PrivateRoute>
                <PrivateRoute path="/updateRequest/:id">
                  <UpdateRequest />
                </PrivateRoute>
                <PrivateRoute path="/requestDetail/:id">
                  <DetailRequest />
                </PrivateRoute>
                <PrivateRoute path="/user">
                  <User />
                </PrivateRoute>
                <PrivateRoute path="/category">
                  <Category />
                </PrivateRoute>
                <PrivateRoute path="/department">
                  <Department />
                </PrivateRoute>
                <PrivateRoute path="/statistical">
                  <Statistical />
                </PrivateRoute>
                <Route path="/forgot-password">
                  <ForgotPassword />
                </Route>
                <Route path="/update-password">
                  <ResetPassword />
                </Route>
                <PrivateRoute path="/change-password">
                  <ChangePassword />
                </PrivateRoute>
              </Switch>
            </Router>
          </ThemeProvider>
        </Provider>
      )}
      </div>
  );
};

export default App;
