import React, {Component} from 'react';
import PropTypes from 'prop-types';
import constants from '../../Common/Constants.js';
import resume from '../../Common/pdfs/Matthew_Fishman_resume.pdf';

var LINK = constants.LINK;


class Message extends Component {
    render(){
        var props       = this.props,
            messages    = props && props.messages,
            messageType = props && props.messageType,
            messagEles;
            
        if(messageType === LINK){
            messagEles = messages.map((item, key) => 
                <a href={resume} target ="_blank" key={key}  className={messageType}>{item}</a>
            );

        } else {    
            messagEles = messages.map((item, key) => 
                <div key={key} className={messageType}>{item}</div>
            );
        }




        return <div className={"message-wrapper " + messageType}>{messagEles}</div>;
    }
}

Message.propTypes = {
    message: PropTypes.string,
    messageType: PropTypes.string
}


export default Message;