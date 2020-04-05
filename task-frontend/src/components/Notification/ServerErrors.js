import React, { Component } from 'react';
import {
  Message
} from 'semantic-ui-react';

class ServerErrors extends Component {


  render() {
    let errMsgBox=null;
    let serverErrMsgArr=[];
    
    if (this.props.errorMessage instanceof Object){
      for(let key in this.props.errorMessage){
        serverErrMsgArr.push(
            <Message.Item key={key}>
                {this.props.errorMessage[key]}
             </Message.Item>
        );
      }
      errMsgBox=(
        <Message error>
          <Message.List>
            {serverErrMsgArr}
          </Message.List>
        </Message>
      )
    }
    else{
      errMsgBox=(
        <Message error>
          <p>
            {this.props.errorMessage}
          </p>
        </Message>
      )
    }

    return(
      errMsgBox
    )
  }
}

export default ServerErrors
