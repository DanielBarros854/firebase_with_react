import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { authentication } from '../../config/firebaseConnection';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      if (email && password) {
        signInWithEmailAndPassword(authentication, email, password)
      } else {
        alert('Algum campo esta vazio!')
      }
    } catch (err) {
      console.log(`Erro ao fazer login, Erro: ${err}`)
    }
  }

  return (
    <div className='container'>
      <div className='title'>
        <h1>Login</h1>
      </div>
      <label>Email</label>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

      <label>Senha</label>
      <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />

      <button onClick={handleLogin}>Login</button>
    </div>
  )
}

export default Login;
