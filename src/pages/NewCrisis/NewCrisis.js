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

import styles from './NewCrisis.module.css'

export function NewCrisis() {
  const [crisisFactors, setCrisisFactors] = useState([])
  const [selectedCrisisFactors, setSelectedCrisisFactors] = useState([])
  const [observation, setObservation] = useState('')

  const { user } = useContext(AuthContext);
  const { studentId } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchCrisisFactors() {
      let formattedFactors = []

      const querySnapshot = await getDocs(collection(db, 'crisisFactors'));
      querySnapshot.forEach((doc) => {
        const factors = {
          id: doc.id,
          factor: doc.data().factor,
        }
        formattedFactors.push(factors)
      });

      setCrisisFactors(formattedFactors)
    }

    fetchCrisisFactors()
  }, [])

  function handleCancel() {
    navigate(-1)
  }

  async function handleSave() {
    try {
      const docRef = doc(db, 'students', studentId)

      await updateDoc(docRef, {
        crisis: arrayUnion({
          id: new Date().valueOf(),
          factors: selectedCrisisFactors,
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
          <h2 className={styles.title}>Preencha as informações de Crise e clique em Salvar</h2>
          <form className={styles.crisisForm}>
            <h3 className={styles.crisisQuestion}>Quais comportamentos a pessoa apresentou no estágio de crise?</h3>

            {crisisFactors.map(factorItem => (
              <label className={styles.checkboxLabel} key={factorItem.id}>
                <input
                  className={styles.factorCheckbox}
                  type="checkbox"
                  id={factorItem.id}
                  value={crisisFactors}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedCrisisFactors([
                        ...selectedCrisisFactors,
                        factorItem,
                      ]);
                    } else {
                      setSelectedCrisisFactors(
                        selectedCrisisFactors.filter((factor) => factor.id !== factorItem.id),
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
                className={styles.saveCrisisButton}
                type="button"
                onClick={handleSave}>Salvar</button>
            </div>
          </form>
        </div>
      </main>
    </>
  )
}
