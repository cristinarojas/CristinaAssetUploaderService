// Dependencies
import React, { createContext, useState } from 'react'
import fetch from 'isomorphic-fetch'

export const AppContext = createContext({
  state: {}
})

const AppProvider = ({ id, children }) => {
  // States
  const [state, setState] = useState({})

  // Methods
  const uploadFile = async selectedFile => {
    const fileData = new FormData()
    fileData.append('file', selectedFile)

    const response = await fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: fileData
    })

    const responseData = await response.json()

    console.log('RESPONSE DATA===', responseData)
    return false
  }

  const context = {
    state,
    uploadFile
  }

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>
}

export default AppProvider
