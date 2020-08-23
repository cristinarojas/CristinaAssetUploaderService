// Dependencies
import React from 'react'

// Components
import Header from './components/Header'
import Uploader from './components/Uploader'

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
