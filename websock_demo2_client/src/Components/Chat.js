import React, {Component} from 'react';
import SockJsClient from 'react-stomp';
import DisplayMessages from './DisplayMessages';

class Chat extends Component {

  constructor(props) {
      super(props);
      this.state = {
          messages: [],
          typedMessage: "Message To Send",
          name: this.props.name,
          recievedMessage: false
      }
      this.generalDisplayArea = React.createRef();
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
              <DisplayMessages ref={this.generalDisplayArea} name = {this.state.name}/>
            </div>
          </div>
        </div>

        <div>
          {/* <SockJsClient url='http://localhost:8080/chat/' */}
          <SockJsClient url='https://web-socket-demo-back.herokuapp.com//chat/'
            topics={['/topic/messages']}
            onConnect={() => {
                console.log("connected!");
            }}
            onDisconnect={() => {
                console.log("Disconnected");
            }}
            onMessage={(msg) => {
                console.log(msg);
                this.generalDisplayArea.current.addMessage(msg);
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
