import React from 'react';
import classes from './Footer.module.scss';

function Footer(props){
    return(
        <footer className={classes.footer}>
            <div className={classes['footer-internal']+' width-constrainer'}>
                <h2>© 2022 sriveer neerukonda</h2>
                <div className={classes.links}>
                    <a href="https://veeru-portfolio.netlify.app/"><i className="bi bi-link-45deg"></i> Let's connect</a>
                    <a href="https://github.com/veeru-neerukonda/wordle-game"><i class="bi bi-git"></i> View Code</a>
                </div>
                
            </div>
        </footer>
    );
}

export default Footer;