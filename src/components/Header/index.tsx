import { useContext } from "react";
import { CgProfile } from "react-icons/cg"
import Popup from "reactjs-popup"
import { UserLoggedContext } from "../../context/user";
import './style.css';

const Header = (props: any) => {

  const { userLogged } = useContext(UserLoggedContext);

  return (
    <header>
    <h1>ReactJs + Firebase</h1>
    {
      props.user &&
      <Popup trigger={<button className="remove-style-button"><CgProfile size={'40px'} /></button>}>
        <div className="user-info">
          <h2>Id: {userLogged?.uid}</h2>
          <h2>Nome: {userLogged?.name}</h2>
          <h2>Email: {userLogged?.email}</h2>
          <h2>Cargo: {userLogged?.office}</h2>
          <h2>Status: Ativo</h2>
        </div>
      </Popup>
    }
  </header>
  )
}

export default Header
