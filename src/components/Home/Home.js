import React from 'react';
import { Link } from 'react-router-dom';

import './Home.css';

class Home extends React.Component {
  render() {
    return (
      <div className='home-container'>
        <div className='home-links'>
          <div className='home-overlay'>
          </div>
          <div className='home-link'><Link to='/edit'>edit attendance</Link></div>
          <div className='home-link'><Link to='/view'>view attendance</Link></div>
        </div>
      </div>
    )
  }
}

export default Home;