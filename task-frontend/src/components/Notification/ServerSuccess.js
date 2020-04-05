import React, { Component } from 'react';
import {
    Message
} from 'semantic-ui-react';

class ServerSuccess extends Component {

    render() {
        let msgBox=null;
        let serverMsgArr=[];

        if (this.props.successMessage instanceof Object){
            for(let key in this.props.successMessage){
                serverMsgArr.push(<Message.Item key={key}>{this.props.successMessage[key]}</Message.Item>);
            }
            msgBox=(
                <Message success>
                    <Message.List>
                        {serverMsgArr}
                    </Message.List>
                </Message>
            )
        }
        else{
            msgBox=(
                <Message success>
                    <p>
                        {this.props.successMessage}
                    </p>
                </Message>
            )
        }

        return(
            msgBox
        )
    }
}

export default ServerSuccess
