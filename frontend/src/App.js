// Dependencies
import React from 'react'

// Components
import Header from './components/header'
import Uploader from './components/uploader'

// React context
import AppProvider from './contexts/app'

function App() {
  return (
    <AppProvider>
      <Header />

      <Uploader />
    </AppProvider>
  )
}

// export
export default App
