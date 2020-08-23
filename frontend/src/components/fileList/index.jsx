// Dependencies
import React from 'react'

// Styles
import styles from './FileList.scss'

const Filelist = ({ filesInS3 }) => {
  return (
    <section className={styles.fileList}>
      <h2>Current files in S3: </h2>
      <span>{filesInS3}</span>
    </section>
  )
}

export default Filelist
