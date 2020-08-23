// Dependencies
import React from 'react'

// Styles
import styles from './Message.scss'

const Message = ({ filesInS3 }) => {
  return (
    <section className={styles.messageContainer}>
      <span>File was uploaded successfully!</span>
    </section>
  )
}

export default Message
