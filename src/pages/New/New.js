import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { collection, addDoc } from "firebase/firestore";

import { db } from '../../services/firebase'
import { Header } from '../../components/Header/Header';

import styles from './New.module.css'

export function New() {
  const [name, setName] = useState('')
  const [bdate, setBdate] = useState('')
  const [serie, setSerie] = useState('')
  const [shift, setShift] = useState('')
  const navigate = useNavigate()

  function handleCancel() {
    navigate('/home')
  }

  async function handleSave() {
    try {
      const docRef = await addDoc(collection(db, "students"), {
        name,
        birthdayDate: bdate,
        serie,
        shift
      });
      console.log("Document written with ID: ", docRef.id);

      navigate('/home')
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <>
      <Header />

      <main className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>Preencha as informações do aluno e clique em Salvar</h2>
          <form className={styles.studentForm}>
            <div className={styles.fieldGroup}>
              <label className={styles.studentLabel} htmlFor="name">Nome do aluno
                <input
                  className={styles.studentInput}
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </label>

              <label className={styles.studentLabel} htmlFor="bdate">Data de Nascimento
                <input
                  className={styles.studentInput}
                  type="date"
                  id="bdate"
                  name="bdate"
                  value={bdate}
                  onChange={(e) => setBdate(e.target.value)}
                  required
                />
              </label>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.studentLabel} htmlFor="serie">Série
                <input
                  className={styles.studentInput}
                  type="text"
                  id="serie"
                  name="serie"
                  value={serie}
                  onChange={(e) => setSerie(e.target.value)}
                  required
                />
              </label>

              <div className={styles.radioContainer}>
                <input
                  type="radio"
                  id="manha"
                  name="shift"
                  value="manha"
                  onChange={() => setShift('manha')}
                  checked={shift === 'manha'}
                />
                <label htmlFor="manha">Manhã</label>

                <input
                  type="radio"
                  id="tarde"
                  name="shift"
                  value="tarde"
                  onChange={() => setShift('tarde')}
                  checked={shift === 'tarde'}
                />
                <label htmlFor="tarde">Tarde</label>

                <input
                  type="radio"
                  id="noite"
                  name="shift"
                  value="noite"
                  onChange={() => setShift('noite')}
                  checked={shift === 'noite'}
                />
                <label htmlFor="noite">Noite</label>
              </div>
            </div>

            <div className={styles.buttons}>
              <button
                className={styles.cancelButton}
                type="button"
                onClick={handleCancel}>Cancelar</button>
              <button
                className={styles.saveStudentButton}
                type="button"
                onClick={handleSave}>Salvar</button>
            </div>
          </form>
        </div>
      </main>
    </>
  )
}
