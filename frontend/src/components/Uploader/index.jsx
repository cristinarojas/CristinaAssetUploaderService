// Dependencies
import React, { useState, useEffect, useContext } from 'react'

// Contexts
import { AppContext } from '../../contexts/app'

// Components
import Filelist from '../FileList'
import Message from '../shared/Message'

// Styles
import styles from './Uploader.scss'

const Uploader = () => {
  // Local State
  const [filesInS3, setFilesInS3] = useState(0)
  const [showMessage, setShowMessage] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState()

  // Contexts
  const { uploadFile, url } = useContext(AppContext)

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
    setShowMessage(true)
  }

  const handleClick = () => {
    setShowMessage(false)
  }

  return (
    <section className={styles.mainContainer}>
      <section className={styles.allFileContainer}>
        <Filelist />
      </section>

      <section className={styles.uploaderContainer}>
        <section className={styles.selectorContainer}>
          <label htmlFor="fileUpload" className={styles.customFileUpload}>
            <i className="fa fa-cloud-upload"></i> Select file
          </label>
          <input
            id="fileUpload"
            type="file"
            name="file"
            onChange={e => loadFile(e)}
            onClick={handleClick}
          />

          {selectedFile ? (
            <button onClick={handleUpload} className={styles.uploadAWS} disabled={showMessage}>
              Upload to S3
            </button>
          ) : (
            ''
          )}
        </section>

        <section className={styles.fileContainer}>
          {selectedFile ? <label className={styles.fileInfo}>{selectedFile.name}</label> : ''}

          {selectedFile && selectedFile.type.includes('image') && (
            <img src={preview} className={styles.imgFile} />
          )}

          {selectedFile && !selectedFile.type.includes('image') && (
            <section className={styles.documentFile}>
              <img src="/images/document.png" />
            </section>
          )}
        </section>

        {url && showMessage ? <Message url={url} /> : ''}
      </section>
    </section>
  )
}

export default Uploader
