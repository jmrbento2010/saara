import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from "firebase/firestore";

import { db } from '../../services/firebase'
import { Header } from '../../components/Header/Header';

import styles from './Home.module.css'

export function Home() {
  const [students, setStudents] = useState([])

  useEffect(() => {
    async function fetchStudents() {
      let formattedStudents = []

      const querySnapshot = await getDocs(collection(db, 'students'));
      querySnapshot.forEach((doc) => {
        const student = {
          id: doc.id,
          name: doc.data().name,
          bdate: doc.data().birthdayDate,
          serie: doc.data().serie,
          shift: doc.data().shift,
        }
        formattedStudents.push(student)
      });

      setStudents(formattedStudents)
    }

    fetchStudents()
  }, [])

  return (
    <>
      <Header />

      <main className={styles.container}>

        <div className={styles.content}>
          <h2 className={styles.title}>Lista de alunos cadastrados</h2>

          <Link className={styles.addStudentButton} to="/new">Cadastrar novo aluno +</Link>

          <ul className={styles.studentList}>
            {students.map(student => (
              <li className={styles.studentListItem} key={student.id}>
                {student.name}

                <div>
                  <Link
                    className={styles.crisisButton}
                    to={`/precrisis/${student.id}`}>Pré-Crises</Link>

                  <Link
                    className={styles.crisisButton}
                    to={`/crisis/${student.id}`}>Crises</Link>
                </div>
              </li>
            ))}
          </ul>
        </div>

      </main>
    </>
  )
}
