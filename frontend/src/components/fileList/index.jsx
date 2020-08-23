// Dependencies
import React, { useContext, useEffect } from 'react'

// Contexts
import { AppContext } from '../../contexts/app'

// Styles
import styles from './FileList.scss'

const Filelist = () => {
  // Contexts
  const { showFiles, allFiles } = useContext(AppContext)

  // Effects
  useEffect(() => {
    showFiles()
  }, [])

  return (
    <section className={styles.fileList}>
      <h2>Current files in S3: </h2>
      <ul className={styles.files}>
        {allFiles &&
          allFiles.map((file, i) => {
            let imgType = file.Key.includes('.jpg') || file.Key.includes('.png')

            return (
              <li key={`file-${i}`}>
                {imgType ? (
                  <img
                    src={`https://cristinaassetuploaderservice.s3-us-west-1.amazonaws.com/${file.Key}`}
                  />
                ) : (
                  <img src="/images/document.png" />
                )}

                <span>
                  <span>
                    File Name: <i className="fa fa-cloud-upload"></i>
                  </span>
                  {file.Key}
                </span>
              </li>
            )
          })}
      </ul>
    </section>
  )
}

export default Filelist
