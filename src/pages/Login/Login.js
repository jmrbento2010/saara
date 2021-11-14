import React, { useContext, useState } from 'react';

import styles from './Login.module.css'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  
  function handleSignIn(e) {
    e.preventDefault()

    console.log('salvar')
    }

  return (
    <>
      <main className={styles.container}>

        <form className={styles.loginform} onSubmit={handleSignIn}>
          <h1 className={styles.logo}>SAARA</h1>

          <label className={styles.loginlabel} htmlFor="email"> Informe seu email
            <input
              className={styles.logininput}
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label className={styles.loginlabel} htmlFor="password"> Informe sua senha
            <input
              className={styles.logininput}
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <button className={styles.loginbutton} type="submit">Entrar</button>
        </form>
      </main>
    </>
  )
}
