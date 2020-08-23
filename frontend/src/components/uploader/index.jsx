// Dependencies
import React, { useState, useEffect, useContext } from 'react'

// Contexts
import { AppContext } from '../../contexts/app'

// Components
import Filelist from '../fileList'
import Message from '../shared/message'

// Styles
import styles from './Uploader.scss'

const Uploader = () => {
  // Local State
  const [filesInS3, setFilesInS3] = useState(0)
  const [showMessage, setShowMessage] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState()

  // Contexts
  const { uploadFile } = useContext(AppContext)

  // Effects
  useEffect(() => {
    if (!selectedFile) {
      setPreview(null)
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)
  }, [selectedFile])

  // Handle image
  const loadFile = e => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(null)
      return
    }

    setSelectedFile(e.target.files[0])
  }

  // Upload to AWS S3
  const handleUpload = () => {
    uploadFile(selectedFile)
    // error set error message as a prop or good also prop
    setShowMessage(true)
  }

  return (
    <section className={styles.mainContainer}>
      <section className={styles.allFileContainer}>
        <Filelist filesInS3={filesInS3} />
      </section>

      <section className={styles.uploaderContainer}>
        <section className={styles.selectorContainer}>
          <label htmlFor="fileUpload" className={styles.customFileUpload}>
            <i className="fa fa-cloud-upload"></i> Select file
          </label>
          <input id="fileUpload" type="file" name="file" onChange={e => loadFile(e)} />

          {selectedFile ? (
            <label onClick={handleUpload} className={styles.uploadAWS}>
              Upload to S3
            </label>
          ) : (
            ''
          )}
        </section>

        <section className={styles.imageContainer}>
          {selectedFile ? <label className={styles.fileInfo}>{selectedFile.name}</label> : ''}
          {selectedFile && <img src={preview} className={styles.outputFile} />}
        </section>

        {showMessage ? <Message /> : ''}
      </section>
    </section>
  )
}

export default Uploader
