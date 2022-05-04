import { signOut } from "firebase/auth";
import { authentication } from "../../config/firebaseConnection";
import './logout.css'

const Logout = () => {
  const handleLogout = async () => {
    await signOut(authentication);
  }

  return (
    <div className='container'>
        <button onClick={handleLogout} className='button-logout'>Sair</button>
    </div>
  )
}

export default Logout;
