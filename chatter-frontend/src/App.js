import "./App.css";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Share from "./pages/Share";
import MyIdeas from "./pages/MyIdeas";
import NewIdeas from "./pages/NewIdeas";
import Idea from "./pages/Idea";
import SavedIdeas from "./pages/Archive";
import LikedIdeas from "./pages/LikedIdeas";
import Profile from "./pages/Profile";
import Notification from "./pages/Notification";

import { authLogoutAction } from "../src/redux/auth/actions";
import {
  getPopularTopics,
  getPopularUsers,
  checkNotification,
} from "./redux/popularity/api";

import React, { useState, useEffect } from "react";
import api from "./axios";

import socket from "./index.js";

function App() {
  const dispatch = useDispatch();
  const selector = useSelector;
  const history = useHistory();

  const token = localStorage.getItem("token");
  const user = selector((state) => state.auth.user);
  const loginSuccessful = selector((state) => state.auth.loginSuccessful);
  const logoutSuccessful = selector((state) => state.auth.logoutSuccessful);
  const [loading, setLoading] = useState(true);

  let loggedOut = (
    <Switch>
      <Route path="/">
        <Landing />
      </Route>
      <Redirect to="/" />
    </Switch>
  );

  let loggedIn = (socket) => {
    return (
      <Switch>
        <Route path="/notifications">
          <Notification socket={socket} />
        </Route>
        <Route path="/profile/:id">
          <Profile socket={socket} />
        </Route>
        <Route path="/liked_ideas">
          <LikedIdeas socket={socket} />
        </Route>
        <Route path="/saved_ideas">
          <SavedIdeas socket={socket} />
        </Route>
        <Route path="/idea/:id">
          <Idea socket={socket} />
        </Route>
        <Route path="/new_ideas">
          <NewIdeas socket={socket} />
        </Route>
        <Route path="/my_ideas">
          <MyIdeas socket={socket} />
        </Route>
        <Route path="/share">
          <Share socket={socket} />
        </Route>
        <Route path="/home">
          <Home socket={socket} />
        </Route>
        <Redirect to="/home" />
      </Switch>
    );
  };
  var [routes, setRoutes] = useState(loggedOut);
  useEffect(() => {
    if (loginSuccessful == null || loginSuccessful == true) {
      if (token === null || user === null) {
        setLoading(false);
      } else {
        api()
          .post("auth/jwt", { token })
          .then(() => {
            dispatch(getPopularTopics());
            dispatch(getPopularUsers());
            dispatch(checkNotification());
            setRoutes(loggedIn(socket));
            setLoading(false);
            socket.emit("user", localStorage.getItem("user"));
            socket.on("popularTopic", () => {
              dispatch(getPopularTopics());
            });
            socket.on("popularUser", () => {
              dispatch(getPopularUsers());
            });
          })
          .catch(() => {
            dispatch(authLogoutAction());
            setLoading(false);
          });
      }
    }
    // eslint-disable-next-line*/
  }, [loginSuccessful]);

  useEffect(() => {
    if (logoutSuccessful) {
      setRoutes(loggedOut);
      history.push("/");
    }
  }, [logoutSuccessful]);

  return loading ? <img src="/small_logo.jpg" alt="image" /> : routes;
}
export default App;
