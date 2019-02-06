import React from 'react';
import './Header.css';

class Header extends React.Component {
    render() {
        return (
            <div className='header'>
                <div className='header-link active'>Home</div>
                <div className='header-link'>About us</div>
                <div className='header-link'>Contact us</div>
            </div>
        );
    }
}

export default Header;