// Dependencies
import React from 'react'

// Components
import Menu from '../shared/Menu'

// Styles
import styles from './Header.scss'

const Header = () => {
  return (
    <section className={styles.headerContainer}>
      <section className={styles.logo}>
        <img src="/images/logo.png" alt="Logo" />
        <h1>Cristina Rojas . Uploader</h1>
      </section>

      <Menu />
    </section>
  )
}

export default Header
