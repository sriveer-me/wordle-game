import React from 'react';
import classes from './Header.module.scss';

function Header(props){
    return(
        <header className={classes.header}>
            <h1>Wordle Game</h1>
            <h3>Made with <i className="bi bi-heart"></i>, from india</h3>
        </header>
    );
}

export default Header;