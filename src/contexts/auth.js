import React, { useState, createContext } from 'react';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut as signOutGoogle
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const auth = getAuth();

  function signIn({ email, password }) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // The signed-in user info.
        const user = {
          email: userCredential.user.email
        };
        setUser(user)
        navigate('/home')
      }).catch((error) => {
        console.log(error.message)
        setUser(null)
      });
  }

  function signOut() {
    signOutGoogle(auth)
    navigate('/')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;