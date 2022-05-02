import { addDoc, collection, getDoc, doc } from 'firebase/firestore/lite';
import { useState } from 'react';
import db from './firebaseConnection';
import './style.css'

const App = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')

  const postsRef = collection(db, 'posts');

  const handlePostAdd = async () => {
    try {
      await addDoc(postsRef, {
        titulo: title,
        autor: author,
      })

      console.log('salvo com sucesso');
      setTitle('');
      setAuthor('');
    } catch (error) {
      console.log(error);
    }
  }

  const handlePost = async () => {
    try {
      const docRef = doc(db, 'posts', 'VQZrG97SikazaLeIFnqh');
      const docSnap = await getDoc(docRef)
      
      if (docSnap.exists()) {
        setTitle(docSnap.data().titulo)
        setAuthor(docSnap.data().autor)
        console.log(`Data: ${docSnap.data().titulo}`)
      } else {
        console.log('Post não encotrado')
      }
    } catch (error) {
      console.log(error);
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
        <button onClick={ handlePost }>Buscar Post</button>
      </div>
    </div>
  );
}

export default App;
