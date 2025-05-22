import React from 'react';
import { NavLink } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { MdLocalMovies } from 'react-icons/md';
import styles from './Navigation.module.css';
import Logo from '../Logo/Logo';

function Navigation() {
  const getLinkClass = ({ isActive }) =>
    `${styles.link} ${isActive ? styles.active : ''}`;

  return (
    <header className={styles.header}>
      <Logo />
      <nav className={styles.nav}>
        <NavLink to="/" className={getLinkClass}>
          <AiFillHome className={styles.icon} />
          Home
        </NavLink>
        <NavLink to="/movies" className={getLinkClass}>
          <MdLocalMovies className={styles.icon} />
          Movies
        </NavLink>
      </nav>
    </header>
  );
}

export default Navigation;
