import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

class Header extends React.Component {
  render() {
    return (
      <div className='header'>
        <Link className='header-link active' to='/'>Home</Link>
        <Link className='header-link' to='/about'>About us</Link>
        <Link className='header-link' to='/contact'>Contact us</Link>
      </div>
    );
  }
}

export default Header;