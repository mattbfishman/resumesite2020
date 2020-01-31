import React, {Component} from 'react';
import constants from '../../Common/Constants.js';
import UserInput from '../UserInput/UserInput';
import Message from '../Message/Message';
import findIndex from 'lodash/findIndex';

import './Terminal.scss';

var terminal    = constants.terminal,
    messages    = constants.messages,
    user        = terminal.user,
    helpmsg     = terminal.helpmsg,
    error       = terminal.error,
    CLEAR       = constants.CLEAR,
    LAST        = constants.LAST,
    INFO        = constants.INFO,
    RESUME      = constants.RESUME,
    LINK        = constants.LINK,
    HELP        = constants.HELP,
    LIST        = constants.LIST;

class Terminal extends Component {
    constructor(props){
        super(props);
        this.state = {
            messages : [{
                'messages': helpmsg,
                'messageType': HELP
            }]
        }
    }

    tabComplete = (foundWords) => {
        var messageState = this.state.messages;

        messageState.push({
            'messages'      : foundWords,
            'messageType'   : LIST
        });

        this.setState({
            messages: messageState
        });

    }

    handleMessage = (input) => {
        var inputLC      = input.toLowerCase().replace(/ /g, ""),
            messageState = this.state.messages,
            found        = findIndex(messages, function(message){
            return message.replace(/ /g, "") === inputLC;
        });

        messageState.push({
            'messages'      : [user, input],
            'messageType'   : LAST
        });

        if(found !== -1){
            if(inputLC === CLEAR){
                messageState = [];            
            } else {
                var output  = terminal[inputLC],
                    msgType;
                
                if(inputLC === HELP){
                    msgType = INFO + '-' + HELP;
                }else if(inputLC === RESUME){
                    msgType = LINK;
                }else{
                    msgType = INFO;
                }                
                messageState.push({
                    'messages'      : output,
                    'messageType'   : msgType
                });
            }
        }else{
            messageState.push({
                'messages'      : error,
                'messageType'   : HELP
            });
        }

        this.setState({
            messages: messageState
        });
    }

    render(){

        var messages = this.state.messages.map((item, key) =>
            <Message key={key} messages={item.messages} messageType={item.messageType}/>
        );

        return(     
            <div className="terminal">
                <div className="terminal-frame">
                    <div className="expand-btn"></div>
                    <div className="close-btn"></div>
                </div>
                <div className="terminal-body">
                    {messages}
                    <UserInput user={user} handleMessage={this.handleMessage} tabComplete={this.tabComplete}/>
                </div>
            </div>
        );
    }
}

export default Terminal;