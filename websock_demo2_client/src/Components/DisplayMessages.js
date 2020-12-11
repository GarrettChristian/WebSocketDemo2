import React, {Component} from 'react';

class DisplayMessages extends Component {

  constructor(props) {
      super(props);
      this.state = {
          messages: [],
          name: this.props.name,
          recievedMessage: false
      }
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }
  
  componentDidUpdate() {
    this.scrollToBottom();
  }

  addMessage = (msg) => {
    var jobs = this.state.messages;
    jobs.push(msg);
    this.setState({messages: jobs});
    this.state.recievedMessage = true;
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
          <div style={{ float:"left", clear: "both" }}
             ref={(el) => { this.messagesEnd = el; }}>
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
