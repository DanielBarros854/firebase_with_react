import { addDoc, collection } from 'firebase/firestore/lite';
import { useState } from 'react';
import db from './firebaseConnection';
import './style.css'

const App = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')

  const handlePostAdd = async () => {
    try {
      await addDoc(collection(db, 'posts'), {
        titulo: title,
        autor: author,
      })

      console.log('salvo com sucesso');
      setTitle('');
      setAuthor('');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='App'>
      <h1>ReactJs + Firebase</h1>
      <div className='container'>
        <label>Titulo: </label>
        <textarea value={title} onChange={(event) => setTitle(event.target.value)} />

        <label>Autor: </label>
        <textarea value={author} onChange={(event) => setAuthor(event.target.value)} />

        <button onClick={handlePostAdd}>Cadastrar</button>
      </div>
    </div>
  );
}

export default App;
