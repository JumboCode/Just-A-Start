import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import CheckBox from './pages/checkbox.jsx';

import JobEntry from './pages/JobEntry.jsx';
import UserDashboard from './pages/UserDashboard.jsx';
import Homepage from './pages/Homepage.jsx';

import AdminDashboardBody from './pages/AdminDashboardBody'
import UserActivityEntry from './pages/UserActivityEntry'


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
