import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { authentication } from "../../config/firebaseConnection";
import './userAdd.css'

const UserAdd = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleUserAdd = async () => {
    try {
      if (email && password) {
        const new_user = await createUserWithEmailAndPassword(authentication, email, password);
        console.log(new_user)
      } else {
        alert('Algum campo esta vazio!')
      }
    } catch (err: any) {
      if (err.code === 'auth/weak-password') {
        alert('Senha muito fraca.');
      } else if (err.code === 'auth/email-already-in-use') {
        alert('Credenciais inválidas. (email ja existe)');
      };
    }
  }

  return (
    <div className='container'>
      <div className='title'>
        <h1>Cadastro de Usuario</h1>
      </div>
      <label>Email</label>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

      <label>Senha</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <button onClick={handleUserAdd}>Cadastrar</button>
    </div>
  )
}

export default UserAdd;
