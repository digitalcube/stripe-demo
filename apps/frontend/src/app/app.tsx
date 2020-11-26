import React from 'react';
import { Route, Switch } from 'react-router';
import { PageIndex } from '../pages/Index';
import { PageSuccess } from '../pages/Success';

export function App() {
  return (
    <Switch>
      <Route path="/success" component={PageSuccess} />
      <Route path="/" exact component={PageIndex} />
    </Switch>
  );
}

export default App;
