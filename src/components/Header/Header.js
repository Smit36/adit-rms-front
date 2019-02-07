import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 'Home'
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    const active = e.target.text;
    this.setState(() => ({ active }));
  }

  render() {
    return (
      <div className='header'>
        <Link className={`header-link ${this.state.active === 'Home' ? 'active' : ''}`} to='/' onClick={this.handleClick}>Home</Link>
        <Link className={`header-link ${this.state.active === 'About us' ? 'active' : ''}`} to='/about' onClick={this.handleClick}>About us</Link>
        <Link className={`header-link ${this.state.active === 'Contact us' ? 'active' : ''}`} to='/contact' onClick={this.handleClick}>Contact us</Link>
      </div>
    );
  }
}

export default Header;