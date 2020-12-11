import './App.css';
import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Chat from "./Components/Chat";
import UserName from './Components/UserName';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
        name: "Default Username"
    }
  }

  setName = (selectedName) => {
    this.setState({
      name: selectedName
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Router>

            <div className="App-title" >
              <br></br>
                
                <h1>
                  Testing Web Sockets!
                </h1>
                <h6>A Simple Chat App By Garrett Christian</h6>
                <Link to="/" style={{ color: '#FFF' }}>
                  return to username select
                </Link>
              <br></br>
            </div>
            <br></br>
          
            <div>
              {/* A <Switch> looks through its children <Route>s and
                  renders the first one that matches the current URL. */}
              <Switch>
                <Route path="/chat">
                  <Chat name={this.state.name}/>
                </Route>
                <Route path="/">
                  <UserName setName = {this.setName} />
                </Route>
              </Switch>
            </div>
          </Router>
        </header>
      </div>
    )
  }
}

export default App