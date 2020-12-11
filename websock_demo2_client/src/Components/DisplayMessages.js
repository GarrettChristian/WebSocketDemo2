// import './App.css';
import React, {Component} from 'react';
import SockJsClient from 'react-stomp';

class DisplayMessages extends Component {

  constructor(props) {
      super(props);
      this.state = {
          messages: this.props.messages,
          name: this.props.name,
          recievedMessage: false
      }
  }

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
    )
  }
}

export default DisplayMessages;
