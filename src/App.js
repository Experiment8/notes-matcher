import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from 'scenes/Home';
import ScalesMatcher from 'scenes/ScalesMatcher';
import NotesMatcher from 'scenes/NotesMatcher';

export default class App extends Component {

  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/scales" component={ScalesMatcher} />
        <Route path="/notes" component={NotesMatcher} />
        <Redirect from="*" to="/" />
      </Switch>
    )
  }
}
