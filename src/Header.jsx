import React from 'react';
import classes from './Header.module.scss';

function Header(props){
    return(
        <header className={classes.header}>
            <div className={classes['header-internal']+' width-constrainer'}>
                <h1>Wordle Game</h1>
                <h3>Made with <i className="bi bi-heart"></i>, from india</h3>
            </div>
        </header>
    );
}

export default Header;