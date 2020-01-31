import React, {Component} from 'react';
import PropTypes from 'prop-types';

import constants from '../../Common/Constants.js';

var messages    = constants.messages,
    ENTER       = constants.ENTER,
    ARROWUP     = constants.ARROWUP,
    ARROWDOWN   = constants.ARROWDOWN,
    TAB         = constants.TAB;

class UserInput extends Component {
    constructor(props){
        super(props);
        this.state = {
            terminalHistory: [],
            pointer: 0
        }
    }

    componentDidMount(){
        this.scrollToBottom();
        this.refs.userinput.focus();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    scrollToBottom = () => {
        this.el.scrollIntoView();
    }

    handleKeyDown = (e) => {
        var key             = e.key, 
            inputVal        = e.target.value,
            terminalHistory = this.state.terminalHistory,
            terminalLen     = terminalHistory.length,
            pointer         = this.state.pointer,
            newPointer;

        if(key === ENTER){
            if(inputVal !== ''){
                this.props.handleMessage(inputVal);
                this.refs.userinput.value = '';
                
                if(terminalHistory[0] !== inputVal){
                    terminalHistory.unshift(inputVal);
                }
                this.setState({
                    pointer: -1,
                    terminalHistory:terminalHistory
                });
            }
        }else if(key === TAB){
            e.preventDefault();
            var inputLC      = inputVal.toLowerCase().replace(/ /g, ""),
            foundWords   = [],
            message, len;

            for(var i = 0; i < messages.length; i++){
                message = messages[i];
                if(message.startsWith(inputLC)){
                    foundWords.push(message);
                }
            }

            len = foundWords.length;
            if(len > 0){
                if(len === 1){
                    this.refs.userinput.value = foundWords[0];
                }
                else{
                    this.props.tabComplete(foundWords);
                }
            }
        }else if(key === ARROWUP){
            newPointer = pointer + 1;
            if(terminalLen > 0 && newPointer < terminalLen){
                this.setState({
                    pointer: newPointer
                }, function(){
                    this.refs.userinput.value = terminalHistory[newPointer];
                });
            }
            e.preventDefault();
        }else if(key === ARROWDOWN){
            newPointer = pointer - 1;
            if(pointer > 0){
                this.setState({
                    pointer: newPointer
                }, function(){
                    this.refs.userinput.value = terminalHistory[newPointer];
                });

            }else if(pointer === 0){
                this.refs.userinput.value = '';
                this.setState({
                    pointer: newPointer
                });
            }
            e.preventDefault();
        }
    }

    render(){
        var props = this.props,
            user  = props && props.user;

        return (
            <div className="user-input">
                {user}<input ref="userinput" onKeyDown={this.handleKeyDown} tabIndex="-1" type="text"/>
                <div ref={el => { this.el = el; }} />
            </div>
        );
    }
}

UserInput.propTypes = {
    user: PropTypes.array
}

UserInput.defaultProps = {
    user: 'Site-Terminal',
}

export default UserInput;