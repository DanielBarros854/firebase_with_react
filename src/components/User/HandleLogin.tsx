/* eslint-disable react-hooks/exhaustive-deps */
import { onAuthStateChanged } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

import './handleLogin.css'
import { UserLoggedContext } from "../../context/user";
import { authentication, db } from "../../config/firebaseConnection";
import Header from "../Header";
import Post from "../Post/Post";
import Logout from "./Logout";
import Login from "./Login";
import UserAdd from "./UserAdd";

const HandleLogin = () => {
  const [user, setUser] = useState(false);
  const [login, setLogin] = useState(true);

  const { userLogged, setUserLogged } = useContext(UserLoggedContext);

  useEffect(() => {
    const checkLogin = async () => {
      onAuthStateChanged(authentication, async (user) => {
        if (!user) {
          setUser(false);
          setUserLogged(null);
          return;
        }
        const snapshot = await getDoc(doc(db, 'users', user.uid))
        if (!snapshot.data()?.status) {
          console.log('Usuario desativado!!!')
          setUser(false);
          setUserLogged(null);
          return;
        }
        setUser(true);
        setUserLogged({
          uid: user.uid,
          email: user.email,
          name: snapshot.data()?.nome,
          office: snapshot.data()?.cargo,
          status: snapshot.data()?.status,
        });
      })
    }

    checkLogin();
  }, [])

  return (
    <div className='HandleLogin'>
      <Header user={user} />
      {
        user
          ? (
            <div className="HandleLogin">
              <h1>Logado {userLogged?.name && <span>com {userLogged.name}</span>}</h1>
              <Post userLogged={userLogged} />
              <Logout />
            </div>
          )
          : (
            <div className="HandleLogin">
              {
                login
                  ? (
                    <div className="login">
                      <Login />
                      <button onClick={() => setLogin(false)}>Criar conta!</button>
                    </div>
                  )
                  : (
                    <div className="login">
                      <UserAdd setLogin={setLogin} />
                      <button onClick={() => setLogin(true)}>Ja tenho uma conta!</button>
                    </div>
                  )
              }
            </div>
          )
      }
    </div>
  )
}

export default HandleLogin;
