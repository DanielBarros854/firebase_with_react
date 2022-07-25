import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { authentication, db } from "../../config/firebaseConnection";
import './userAdd.css'

const UserAdd = (props: any) => {
  const [name, setName] = useState('');
  const [office, setOffice] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleUserAdd = async () => {
    try {
      if (email && password) {
        const new_user = await createUserWithEmailAndPassword(authentication, email, password);

        await setDoc(doc(db, 'users', new_user.user.uid), {
          nome: name,
          cargo: office,
          status: true,
        })
        props.setLogin(true);
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
      <label>Nome</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

      <label>Cargo</label>
      <input type="text" value={office} onChange={(e) => setOffice(e.target.value)} />

      <label>Email</label>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

      <label>Senha</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <button onClick={handleUserAdd}>Cadastrar</button>
    </div>
  )
}

export default UserAdd;
