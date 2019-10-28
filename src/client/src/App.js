import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import login from './pages/login.jsx';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";

// Pages
import { MainPage } from "./pages/index";
import NotFoundPage from "./pages/404";

class App extends Component {

  render() {
    return (<Router>
      <Switch>
      <Route exact path="/" component={MainPage}></Route>
      <Route component={NotFoundPage}></Route>
      </Switch>
    </Router>);
  }
}

// function App() {
//   return (
//     <div className="App">
//       <header className=" App-header">
//         <p>
//           Hello Jumbocode
//         </p>
//       </header>
//     </div>
//   );
// }

export default App;
