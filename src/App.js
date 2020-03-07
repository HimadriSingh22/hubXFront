import React,{Component} from 'react';
import logo from './logo.svg';
import './App.css';
import SignUp from './components/SignUp';
import {Route,Switch,BrowserRouter as Router} from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import EventDashBoard from './components/EventDashboard';
import history from './history';
import PrivateRoute from './components/PrivateRoute';
class App extends Component {
  render(){

  return (
    <div className="App">
 
      <Router history={history} >
      {/* <Switch> */}
        <Route exact path="/"  component={Home}/>
        <Route path="/signup"  component={SignUp}/>
        <Route path="/login"  component={Login}/>
        <Route path="/eventDashboard" component={EventDashBoard}/>
        {/* </Switch> */}
</Router>
    </div>
  );}
}

export default App;
