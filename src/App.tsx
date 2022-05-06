import Login from "./components/User/Login";
import Post from "./components/Post/Post";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import UserAdd from "./components/User/UserAdd";
import { authentication, db } from "./config/firebaseConnection";
import './styles.css'
import Logout from "./components/User/Logout";
import { doc, getDoc } from "firebase/firestore";
import Header from "./components/Header";

export interface UserLoggedInterface {
  uid: string,
  email: string | null,
  name: string | null,
  office: string | null,
  status: boolean | null,
}

const App = () => {
  const [user, setUser] = useState(false);
  const [userLogged, setUserLogged] = useState({} as UserLoggedInterface | null);
  const [login, setLogin] = useState(true);

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
    <div className='App'>
      <Header user={user} userLogged={userLogged}/>
      {
        user
          ? (
            <div className="App">
              <h1>Logado {userLogged?.name && <span>com {userLogged.name}</span>}</h1>
              <Post userLogged={userLogged}/>
              <Logout />
            </div>
          )
          : (
            <div className="App">
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
                      <UserAdd setLogin={setLogin}/>
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

export default App;
