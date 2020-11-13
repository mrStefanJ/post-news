import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import { Home } from "./page/Home/Home";
import { PostDetails } from './page/PostDetails/PostDetails';

export const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/post/:id">
          <PostDetails />
        </Route>
      </Switch>
    </Router>
  )
}
