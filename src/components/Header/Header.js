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

  componentWillMount() {
    const path = window.location.pathname;
    if (path === '/about') {
      this.setState(() => ({ active: 'About' }));
    } else if (path === '/contact') {
      this.setState(() => ({ active: 'Contact' }));
    }
  }

  render() {
    return (
      <div className='header'>
        <div className='header-name'>
          <div>Record Management System</div>
        </div>
        <Link className={`header-link ${this.state.active === 'Home' ? 'active' : ''}`} to='/' onClick={this.handleClick}>Home</Link>
        <Link className={`header-link ${this.state.active === 'About' ? 'active' : ''}`} to='/about' onClick={this.handleClick}>About</Link>
        <Link className={`header-link ${this.state.active === 'Contact' ? 'active' : ''}`} to='/contact' onClick={this.handleClick}>Contact</Link>
      </div>
    );
  }
}

export default Header;