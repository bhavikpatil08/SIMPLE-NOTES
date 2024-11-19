import { useEffect, useState } from 'react'
import './App.css'
import axios from "axios";

function App() {
   
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes]= useState([]);

  async function getNotes() {
    await axios({
      method: 'get',
      url: 'http://localhost:8080/notes',
    });
    setNotes(response.data.data);
  }

  async function addNote() {
    await axios({
      method: 'post',
      url: 'http://localhost:8080/add',
      data: {
        id: Math.random().toString(),
        title: title,
        content: content,
      },
    });
    setTitle("");
    setContent("");
    getNotes();
  }

  useEffect(function() {
    getNotes();
  }, []);

  return( <>
  <div className="form">
    <input 
    value={title} 
    onChange={(e) => {
      setTitle(e.target.value);
    }} 
    type="text" 
    placeholder="Title" 
    />
    
    <input value={content}
    onChange={(e) => setContent(e.target.value)}
     content={content}
     type="text" 
     placeholder="Content" 
     />
    
    <button>Add</button>
  </div>

  <div className="notes">
    {notes.map((element) => {
      return (
      <div key={element.id}>
        <h2>{element.title}</h2>
        <p>{element.content}</p>

      </div>)
    })}
  </div>
  </>
  );
}

export default App
