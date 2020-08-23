// Dependencies
import React from 'react'

// Styles
import styles from './Menu.scss'

// Data for menu
const menuOptions = [
  {
    name: 'My tech blog',
    link: 'https://learntechsystems.com/'
  },
  {
    name: 'Linkedin',
    link: 'https://www.linkedin.com/in/cristina-elizabeth-rojas-zamora-a7076249/'
  },
  {
    name: 'Github',
    link: 'https://github.com/cristinarojas'
  }
]

const Menu = () => {
  return (
    <section className={styles.menuContainer}>
      <nav>
        <ul>
          {menuOptions
            ? menuOptions.map((option, i) => {
                return (
                  <li key={`index-${i}`}>
                    <a href={option.link} target="_blank" rel="noopener noreferrer">
                      {option.name}
                    </a>
                    <img src="/images/crissFavicon.png" alt={option.name} />
                  </li>
                )
              })
            : ''}
        </ul>
      </nav>
    </section>
  )
}

export default Menu
