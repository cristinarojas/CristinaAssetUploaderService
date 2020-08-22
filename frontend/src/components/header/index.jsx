// Dependencies
import React from 'react';

// Components
import Menu from '../shared/menu';

// Styles 
import './header.scss';

// Assets
import logo from '../../assets/logo.png';

const Header = () => {
  return ( 
    <section className="headerContainer">
      <section className="logo">
          <img src={logo} alt="Logo" />
          <h1>Cristina Rojas . Uploader</h1>
      </section>

      <Menu />
    </section>
  )
}

export default Header;