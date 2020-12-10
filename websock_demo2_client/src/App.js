import './App.css';
import React, {Component} from 'react';
import SockJsClient from 'react-stomp';
// import Button from 'react-bootstrap/Button';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import TextField from '@material-ui/core/TextField';

class App extends Component {

  constructor(props) {
      super(props);
      this.state = {
          messages: [],
          typedMessage: "Message To Send",
          name: "Garrett"
      }
  }

  setName = (name) => {
      console.log(name);
      this.setState({name: name});
  };

  sendMessage = () => {
    this.clientRef.sendMessage('/app/chat', JSON.stringify({
        from: this.state.name,
        text: this.state.typedMessage
    }));
    this.setState({typedMessage: "Message To Send"});
  };

  displayMessages = () => {
    return (
      <div>
          {this.state.messages.map(msg => {
            return (
                <div>
                    {this.state.name === msg.from ?
                      <div>
                        <p style={{ color: 'green' }}>{msg.from} : {msg.text} : {msg.time}</p>
                      </div> :
                      <div>
                        <p style={{ color: 'red' }}>{msg.from} : {msg.text} : {msg.time}</p>
                      </div>
                    }
              </div>)
          })}
      </div>
    );
  };  

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>
            {this.state.name} Testing Web Sockets!
          </h1>
      
          <form onSubmit={this.handleSubmit}>
            <label>
              <p>User : </p>
              <textarea value={this.state.name} onChange={(event) => {
                this.setState({name: event.target.value});
              }}/>
            </label>
          </form>

          <div className="align-center">
            <br/><br/>

            <form onSubmit={this.handleSubmit}>
              <label>
                <p>Message : </p>
                <textarea value={this.state.typedMessage} onChange={(event) => {
                  this.setState({typedMessage: event.target.value});
                }}/>
              </label>
            </form>

            <button onClick={this.sendMessage}>Send</button>

          </div>
          <br/><br/>
          <div className="align-center">
              Messages:{this.displayMessages()}
          </div>

          <div>
            <SockJsClient url='http://localhost:8080/chat/'
              topics={['/topic/messages']}
              onConnect={() => {
                  console.log("connected!");
              }}
              onDisconnect={() => {
                  console.log("Disconnected");
              }}
              onMessage={(msg) => {
                  var jobs = this.state.messages;
                  jobs.push(msg);
                  this.setState({messages: jobs});
                  console.log(msg);
              }}
              ref={(client) => {
                  this.clientRef = client
              }}/>
          </div>
        </header>
      </div>
    )
  }
}

export default App;
