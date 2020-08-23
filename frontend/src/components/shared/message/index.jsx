// Dependencies
import React from 'react'

// Styles
import styles from './Message.scss'

const Message = ({ url }) => {
  return (
    <section className={styles.messageContainer}>
      <span>File uploaded successfully at:</span>
      <p>{url}</p>
    </section>
  )
}

export default Message
