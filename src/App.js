import React, {useState} from 'react';
import {Route} from "react-router-dom"
import TOS from "./TOS"
// import Users from "./Users"

import FormikLoginForm from "./LoginForm.js"

function App() {
  // const [userList, setUserList] = useState({
  //   name: 'kyle richardson',
  //   email: 'kyle.r@me.com',
  //   password: '123456',
  //   account: 'gold'
  // })

  return (
    <div className="App">
      <Route path="/tos" component={TOS} />
      <Route exact path="/" component={FormikLoginForm} />
      {/* <Users userList={userList}/> */}
    </div>
  );
}

export default App;
