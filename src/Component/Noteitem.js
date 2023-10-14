import React from 'react'
import { useContext } from 'react';
import noteContext from './Context/notes/noteContext';

export default function Noteitem(props) {
    const {note,updateNote}=props;
 
    
    
    const {deleteNote}=useContext(noteContext);
  return (
    <div className="col-md-3 my-3">
        <div className="card" >
     <div className="card-body">
    <div className="d-flex align-items-center">
    <h5 className="card-title">{note.title}</h5>
    <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}>e</i>
    <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(note._id)}}>d</i>
    </div>
    <p className="card-text">{note.describtion}</p>
    </div>
    </div>
</div>
  )
}
