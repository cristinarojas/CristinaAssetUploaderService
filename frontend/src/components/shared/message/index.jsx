// Dependencies
import React from 'react'

// Styles
import styles from './Message.scss'

const Message = ({ url }) => {
  return (
    <section className={styles.messageContainer}>
      <span>File uploaded successfully at:</span>
      <p>
        <a href={url} target="_blank">
          {url}
        </a>
      </p>
    </section>
  )
}

export default Message
