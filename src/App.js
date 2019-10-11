import React from 'react';
import {Route} from "react-router-dom"
import TOS from "./TOS"

import FormikLoginForm from "./LoginForm.js"

function App() {

  return (
    <div className="App">
      <Route path="/tos" component={TOS} />
      <Route exact path="/" component={FormikLoginForm} />
    </div>
  );
}

export default App;
