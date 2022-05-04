import Login from "./components/User/Login";
import Post from "./components/Post/Post";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import UserAdd from "./components/User/UserAdd";
import { authentication } from "./config/firebaseConnection";
import './styles.css'
import Logout from "./components/User/Logout";

interface UserLoggedInterface {
  uid: string,
  email: string | null,
  name: string | null
}

const App = () => {
  const [user, setUser] = useState(false);
  const [userLogged, setUserLogged] = useState({} as UserLoggedInterface | null);
  const [login, setLogin] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      onAuthStateChanged(authentication, (user) => {
        if (user) {
          setUser(true);
          setUserLogged({
            uid: user.uid,
            email: user.email,
            name: user.displayName,
          });
        } else {
          setUser(false);
          setUserLogged(null);
        }
      })
    }

    checkLogin();
  }, [])

  return (
    <div className='App'>
      <h1>ReactJs + Firebase</h1>
      {
        user
          ? (
            <div className="App">
              <h1>Logado {userLogged?.email && <span>com {userLogged.email}</span>}</h1>
              <Post />
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
                      <UserAdd />
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
