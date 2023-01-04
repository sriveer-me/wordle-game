import React from 'react';
import classes from './Footer.module.scss';

function Footer(props){
    return(
        <footer className={classes.footer}>
            <h2>© 2022 sriveer neerukonda</h2>
            <a href="javascript:void(0)"><i class="bi bi-link-45deg"></i> Let's connect</a>
        </footer>
    );
}

export default Footer;