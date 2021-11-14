import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../../contexts/auth';

import styles from './Header.module.css'

export function Header() {
  const { signOut, user } = useContext(AuthContext);

  return (
    <header className={styles.container}>
      <Link to="/home" className={styles.logo}>SAARA</Link>

      <div className={styles.info}>
        <span className={styles.welcome}>{user.email}</span>
        <button className={styles.logoutButton} onClick={signOut}>Sair</button>
      </div>
    </header>
  )
}
