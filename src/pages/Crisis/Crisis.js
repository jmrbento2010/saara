import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getDoc, doc } from "firebase/firestore";

import { db } from '../../services/firebase'
import { Header } from '../../components/Header/Header';

import styles from './Crisis.module.css'

export function Crisis() {
  const [student, setStudent] = useState(null)
  const [selectedRecord, setSelectedRecord] = useState(null)
  const { studentId } = useParams();

  useEffect(() => {
    async function fetchStudent() {
      const docSnap = await getDoc(doc(db, 'students', studentId));
      if (docSnap.exists()) {
        const student = {
          id: docSnap.id,
          name: docSnap.data().name,
          crisis: docSnap.data().crisis
        }
        setStudent(student)
      } else {
        console.log("No such document!");
      }
    }

    fetchStudent()
  }, [studentId])

  return (
    <>
      <Header />

      <main className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>Formulários crise de {student && student.name}</h2>

          <Link
            className={styles.addCrisisButton}
            to={`/crisis/${student && student.id}/new`}
          >Cadastrar novo formulário Crise +</Link>

          <ul className={styles.studentList}>
            {student && student.crisis && student.crisis.map(record => (
              <li
                className={styles.studentListItem}
                key={record.id}
                onClick={() => setSelectedRecord(record.id)}
              >
                <div className={styles.recordHeader}>
                  <span className={styles.recordTitle}>
                    Registrado por {record.author} {' '}
                  </span>
                  <span className={styles.recordDate}>
                    {new Intl.DateTimeFormat('pt-BR', { dateStyle: 'full', timeStyle: 'medium', }).format(record.timestamp.toDate())}
                  </span>
                </div>

                {record.id === selectedRecord && (
                  <div className={styles.recordDetails}>
                    <p className={styles.recordDetailsTitle}>FATORES</p>
                    {record.factors && record.factors.map(f => (
                      <div key={f.factor}>
                        <p>{f.factor}</p>
                      </div>
                    ))}
                    <p className={styles.recordDetailsTitle}>OBSERVAÇÃO</p>
                    <p>{record.observation}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  )
}
