import React from 'react';
import logo from '../images/logo.svg';
import { useLocation } from 'react-router';
import { NavLink } from 'react-router-dom';

function Header({loggedIn, onLogin, onRegistration, userEmail, onLogout}) {

    const location = useLocation();

    return (
        <header className="header">
            <img className="logo" src={logo} alt="логотип в шапке" />
            {!loggedIn && (
                <nav className='header__nav'>
                    {location.pathname==='/sign-up' && 
                        <NavLink to="/sign-in" className="header__link" onChange={onLogin}>Войти</NavLink>
                    }
                    {location.pathname==='/sign-in' && 
                        <NavLink to="/sign-up" className="header__link" onChange={onRegistration}>Регистрация</NavLink>
                    }
                </nav>

            )}
            {loggedIn && (
                <div className='header__nav'>
                    <address className='header__email'>{userEmail && userEmail}</address>
                    <button className='header__exit-button' onClick={onLogout}>Выйти</button>
                </div>
            )}
        </header>
    )
}

export default Header;