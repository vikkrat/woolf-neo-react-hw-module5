import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Logo.module.css';

import logo from '../../assets/logo.svg';

function Logo() {
    return (
        <Link to="/" className={styles.logoLink}>
            <div className={styles.logoWrapper}>
                <img
                    src={logo}
                    alt="La La Movies Logo"
                    className={styles.logoImage}
                />
                <span className={styles.logoText}>La La Movies</span>
            </div>
        </Link>
    );
}

export default Logo;

