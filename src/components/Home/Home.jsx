import React, { useState } from "react";
import { useEffect } from "react";
import { FaCheck } from "react-icons/fa";
export default function Home() {

  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState("");

  const addNote = (e) => {
    e.preventDefault(); // this prevents the page from refreshing
    setNotes([...notes, note]);
    setNote(""); // Clear the input after adding
  };

  useEffect(() =>{
    const notes=localStorage.getItem("notes");
    if(notes!=null){
      setNotes(JSON.parse(notes));
    }

  },[]);

  useEffect(()=>{
    localStorage.setItem("notes", JSON.stringify(notes));
  },[notes]);

  const deleteNote=(index)=>{
    const new_notes=[...notes];//copy the notes array
    new_notes.splice(index, 1); //remove first index starting from the index
    setNotes(new_notes); //update the notes with the new_notes
  }

  return (
  <section className="py-5 d-flex flex-column justify-content-center align-items-center gap-5">

    <div className="d-flex flex-column justify-content-center align-items-center gap-2">
      <h2>Manage Your Data with Ease</h2>
      <p className='fs-3'>Effortlessly create, view, and update your data.</p>
    </div>


    <div className="management py-5">
    <div >
        <form  className="d-flex justify-content-center align-items-center gap-2">
          <input type="text" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Write a note" style={{width: '14rem'}} className="py-2 rounded"/>
          <button onClick={addNote} type="submit" className="btn btn-primary" style={{width: '7rem'}}>Add</button>
        </form>
        <ul>
          {notes.map((note, index) => (
            <li key={index}>
              <div className="d-flex gap-4">
                <p className="fs-4 fw-bold">{note}</p>
                <FaCheck onClick={() => deleteNote(index)} className="fs-5 text-success" />
              </div>
            </li>
          ))}
        </ul>

      </div>
    </div>

  </section>

    

  )
}
