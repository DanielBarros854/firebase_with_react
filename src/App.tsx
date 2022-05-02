import { onSnapshot, addDoc, collection, getDoc, doc, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import db from './firebaseConnection';
import './style.css'

const App = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [id, setId] = useState('');
  const [posts, setPosts] = useState([] as any[]);

  const postsRef = collection(db, 'posts');

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const _query = query(collection(db, 'posts'))
        onSnapshot(_query, (docs) => {
          const myPosts: any[] = [];

          docs.forEach((doc) => {
            myPosts.push({
              id: doc.id,
              title: doc.data().titulo,
              author: doc.data().autor,
            })
          })

          setPosts(myPosts);
        });
      } catch (error) {
        console.log(error);
      } 
    }
    loadPosts();
  }, [])

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
      if (!id) {
        alert('Informe um id valido');
        return;
      }
      const docRef = doc(db, 'posts', id);
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setTitle(docSnap.data().titulo)
        setAuthor(docSnap.data().autor)
      } else {
        alert('Post não encotrado')
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

        <label>Id: </label>
        <textarea value={id} onChange={(event) => setId(event.target.value)} />
  
        <button onClick={handlePost}>Buscar Post</button>
        <ul>
          {posts.map((post) => {
            return (
              <li key={post.id}>
                <span>Id: {post.id}</span>
                <span>Titulo: {post.title}</span>
                <span>Autor: {post.author}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
