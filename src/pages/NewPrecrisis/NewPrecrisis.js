import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
  collection,
  doc,
  getDocs,
  arrayUnion,
  updateDoc,
  Timestamp
} from "firebase/firestore";

import AuthContext from '../../contexts/auth';
import { db } from '../../services/firebase'
import { Header } from '../../components/Header/Header';

import styles from './NewPrecrisis.module.css'

export function NewPrecrisis() {
  const [precrisisFactors, setPrecrisisFactors] = useState([])
  const [selectedPrecrisisFactors, setSelectedPrecrisisFactors] = useState([])
  const [observation, setObservation] = useState('')

  const { user } = useContext(AuthContext);
  const { studentId } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchPrecrisisFactors() {
      let formattedFactors = []

      const querySnapshot = await getDocs(collection(db, 'precrisisFactors'));
      querySnapshot.forEach((doc) => {
        const factors = {
          id: doc.id,
          factor: doc.data().factor,
        }
        formattedFactors.push(factors)
      });

      setPrecrisisFactors(formattedFactors)
    }

    fetchPrecrisisFactors()
  }, [])

  function handleCancel() {
    navigate(-1)
  }

  async function handleSave() {
    try {
      const docRef = doc(db, 'students', studentId)

      await updateDoc(docRef, {
        precrisis: arrayUnion({
          id: new Date().valueOf(),
          factors: selectedPrecrisisFactors,
          observation,
          author: user.email,
          timestamp: Timestamp.fromDate(new Date())
        })
      });

      navigate(-1)
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <>
      <Header />

      <main className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>Preencha as informações Pré-Crise e clique em Salvar</h2>
          <form className={styles.precrisisForm}>
            <h3 className={styles.precrisisQuestion}>Quais fatores desencadearam o comportamento de resmungo?</h3>

            {precrisisFactors.map(factorItem => (
              <label className={styles.checkboxLabel} key={factorItem.id}>
                <input
                  className={styles.factorCheckbox}
                  type="checkbox"
                  id={factorItem.id}
                  value={precrisisFactors}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedPrecrisisFactors([
                        ...selectedPrecrisisFactors,
                        factorItem,
                      ]);
                    } else {
                      setSelectedPrecrisisFactors(
                        selectedPrecrisisFactors.filter((factor) => factor.id !== factorItem.id),
                      );
                    }
                  }}
                />
                {factorItem.factor}
              </label>
            ))}

            <textarea
              className={styles.observation}
              name="observation"
              id="observation"
              cols="20"
              rows="5"
              placeholder="Descreva aqui suas observações"
              value={observation}
              onChange={e => setObservation(e.target.value)}
            />

            <div className={styles.buttons}>
              <button
                className={styles.cancelButton}
                type="button"
                onClick={handleCancel}>Cancelar</button>
              <button
                className={styles.savePrecrisisButton}
                type="button"
                onClick={handleSave}>Salvar</button>
            </div>
          </form>
        </div>
      </main>
    </>
  )
}
