import React from 'react';
import styles from './Footer.module.css';
import logoManifest from '../../assets/logo-192.png';

function Footer() {
  return (
    <footer className={styles.footer}>
      <img src={logoManifest} alt="La La Movies Logo" width="115" />
      <p>La La Movies © {new Date().getFullYear()}</p>
    </footer>
  );
}

export default Footer;
