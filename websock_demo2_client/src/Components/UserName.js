import React, {Component} from 'react';
import { withRouter} from 'react-router-dom';

class UserName extends Component {

    constructor(props) {
        super(props);
        this.state = {
            curName: "Default Username",
            showError: false
        }
        this.startChat = this.startChat.bind(this)
    }

    startChat() {
      let curNameLen = this.state.curName.length 
      if (curNameLen > 0) {
        this.props.setName(this.state.curName)
        this.props.history.push(`/chat`); 
      } else {
        this.setState({showError: true});
      }
    }
  
    render() {
      return (
        <div>
          <h2>
            Chatting as: {this.state.curName} 
          </h2>
        
          <form onSubmit={this.handleSubmit}>
            <label>
              <p>Set Username to chat</p>
              <textarea className="textarea" value={this.state.curName} onChange={(event) => {
                this.setState({curName: event.target.value});
              }}/>
            </label>
          </form>

          <button className="button" onClick={this.startChat}>Start Chatting!</button>

          <div style={{display: this.state.showError ? 'block' : 'none' }}>
            <p>
              Your Username must be longer than 1 character to chat
            </p>
          </div>
        </div>
      )
    }
  }
  
  export default withRouter(UserName);
  