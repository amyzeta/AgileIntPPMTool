import React, { Component } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Header from './components/Layout/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AddProject from './components/Project/AddProject';
import UpdateProject from './components/Project/UpdateProject';
import TaskBoard from './components/Task/TaskBoard';
import { Provider } from 'react-redux';
import store from './store';
import AddTask from './components/Task/AddTask';
import UpdateTask from './components/Task/UpdateTask';
import Landing from './components/Layout/Landing';
import Register from './components/UserManagement/Register';
import Login from './components/UserManagement/Login';
import SecuredRoute from './components/UserManagement/SecuredRoute';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            {
              // public routes
            }
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />

            {
              // private routes
            }
            <SecuredRoute exact path="/dashboard" component={Dashboard} />
            <SecuredRoute exact path="/addProject" component={AddProject} />
            <SecuredRoute exact path="/updateProject/:id" component={UpdateProject} />
            <SecuredRoute exact path="/taskBoard/:projectId" component={TaskBoard} />
            <SecuredRoute exact path="/taskBoard/:projectId/addTask" component={AddTask} />
            <SecuredRoute exact path="/taskBoard/:projectId/updateTask/:taskId" component={UpdateTask} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
