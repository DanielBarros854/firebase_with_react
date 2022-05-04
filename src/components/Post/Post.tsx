import { onSnapshot, addDoc, collection, doc, query, updateDoc, deleteDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../config/firebaseConnection';
import './style.css'

const Post = () => {
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [posts, setPosts] = useState([] as any[]);

  const postsRef = collection(db, 'posts');

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const _query = query(collection(db, 'posts'));
        onSnapshot(_query, (docs) => {
          const myPosts: any[] = [];

          docs.forEach((doc) => {
            myPosts.push({
              id: doc.id,
              title: doc.data().titulo,
              author: doc.data().autor,
            });
          });

          setPosts(myPosts);
        });
      } catch (error) {
        console.log(`UseEffect: ${error}`);
      }
    }
    loadPosts();
  }, []);

  const handlePostAdd = async () => {
    try {
      await addDoc(postsRef, {
        titulo: newTitle,
        autor: newAuthor,
      });

      alert('salvo com sucesso');
      setNewTitle('');
      setNewAuthor('');
    } catch (error) {
      console.log(`handlePostAdd: ${error}`);
    }
  };

  const handleOnClickPostUpdate = (id: string, author: string, title: string) => {
    setId(id);
    setAuthor(author);
    setTitle(title);
  }

  const handlePostUpdate = async () => {
    try {
      await updateDoc(doc(db, 'posts', id), {
        titulo: title,
        autor: author,
      });
      setId('');
      setTitle('');
      setAuthor('');
      alert('Atualizado com sucessos');
    } catch (error) {
      console.log(`handlePostUpdate: ${error}`);
    };
  };

  const handlePostDelete = async (id: string) => {
    try {
      if (!id) {
        alert('Informe um id valido');
        return;
      };
      await deleteDoc(doc(db, 'posts', id));
      alert('Deletado com sucessos');
    } catch (error) {
      console.log(`handlePostDelete: ${error}`)
    }
  }

  return (
    <div className='post-container'>
      {!id &&
        <div className='create-post'>
          <label>Titulo: </label>
          <textarea value={newTitle} onChange={(event) => setNewTitle(event.target.value)} />

          <label>Autor: </label>
          <textarea value={newAuthor} onChange={(event) => setNewAuthor(event.target.value)} />

          <button onClick={handlePostAdd}>Cadastrar</button>
        </div>
      }

      {id &&
        <div className='update-post'>
          <label>Id: </label>
          <textarea value={id} readOnly />

          <label>Titulo: </label>
          <textarea value={title} onChange={(event) => setTitle(event.target.value)} />

          <label>Autor: </label>
          <textarea value={author} onChange={(event) => setAuthor(event.target.value)} />
          <div>
            <button onClick={handlePostUpdate}>Atualizar Post</button>
            <button onClick={() => setId('')}>Cancelar</button>
          </div>
        </div>
      }

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Autor</th>
            <th>Titulo</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => {
            return (
              <tr>
                <td>{post.id}</td>
                <td>{post.author}</td>
                <td>{post.title}</td>
                <button className='button-deletar-post' onClick={() => handlePostDelete(post.id)}>Deletar</button>
                <button className='button-deletar-post' onClick={() => handleOnClickPostUpdate(post.id, post.author, post.title)}>Atualizar</button>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Post;
