// Dependencies
import React from 'react';

// Styles 
import './message.scss';

const Message = ({ filesInS3 }) => {

  return ( 
    <section className="messageContainer">
        <span>File was uploaded successfully!</span>
    </section>
  )
}

export default Message;