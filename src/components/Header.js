import React from 'react';
import logo from '../images/logo.svg';

function Header() {
    return (
        <header className="header">
        <img className="logo" src={logo} alt="логотип в шапке" />
    </header>
    )
}

export default Header;