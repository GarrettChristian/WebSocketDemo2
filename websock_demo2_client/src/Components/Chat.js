// import './App.css';
import React, {Component} from 'react';
import SockJsClient from 'react-stomp';

class Chat extends Component {

  constructor(props) {
      super(props);
      this.state = {
          messages: [],
          typedMessage: "Message To Send",
          name: this.props.name,
          recievedMessage: false
      }
  }

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
                  <p style={{ color: '#6c90aa' }}>{msg.from} : {msg.text} : {msg.time}</p>
                </div> :
                <div>
                  <p style={{ color: '#93aabc' }}>{msg.from} : {msg.text} : {msg.time}</p>
                </div>
              }
            </div>)
        })}
      </div>
    );
  };  

  render() {
    return (
      <div>
        <h2>
          Chatting as: {this.state.name} 
        </h2>

        <br></br>

        <div class="container">
          <div class="row">
            <div class="col-md-6">
              {/* Submit message area */}
              <form onSubmit={this.handleSubmit}>
                <label>
                  <p>Send Message: </p>
                  <textarea className="textarea" value={this.state.typedMessage} onChange={(event) => {
                    this.setState({typedMessage: event.target.value});
                  }}/>
                </label>
              </form>

              <button className="button" onClick={this.sendMessage}>Send</button>
            </div>

            <div class="col-md-6">
              {/* Display messages */}
              <p>Messages:</p>
              <div className="DivWithScroll" style={{display: this.state.recievedMessage ? 'block' : 'none' }}>
                <div className="DivToScroll">
                  {this.displayMessages()}
                </div>
              </div>
              <div className="DivToScroll" style={{display: !this.state.recievedMessage ? 'block' : 'none' }}>
                nothing recieved yet
              </div>
            </div>
          </div>
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
                this.state.recievedMessage = true;
            }}
            ref={(client) => {
                this.clientRef = client
            }}/>
        </div>
      </div>
    )
  }
}

export default Chat;
