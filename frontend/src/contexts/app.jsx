// Dependencies
import React, { createContext, useState, useEffect } from 'react'
import fetch from 'isomorphic-fetch'

export const AppContext = createContext({
  state: {}
})

const AppProvider = ({ id, children }) => {
  // States
  const [state, setState] = useState({})
  const [url, setUrl] = useState('')
  const [allFiles, setAllFiles] = useState([])

  // Methods

  // Method to upload files to Amazon S3
  const uploadFile = async selectedFile => {
    const fileData = new FormData()
    fileData.append('file', selectedFile)

    const response = await fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: fileData
    })

    const responseData = await response.json()

    if (responseData) {
      showFiles()
      setUrl(responseData.Location)
    }

    return responseData
  }

  // Method to get all the files that are in Amazon S3
  const showFiles = async () => {
    const response = await fetch('http://localhost:5000/files', {
      method: 'GET'
    })

    const responseData = await response.json()

    setAllFiles(responseData)
  }

  const context = {
    state,
    uploadFile,
    url,
    showFiles,
    allFiles
  }

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>
}

export default AppProvider
