import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import noteContext from './Context/notes/noteContext'

export default function AddNote() {
    const {addNote}=useContext(noteContext)
    const [note,setNote]=useState({title:"",describtion:"",tag:""})
    const handleClick=(e)=>{
          e.preventDefault();          
          addNote(note.title,note.describtion,note.tag); // addNote also a function 
          setNote({title:"",describtion:"",tag:""})
    }
    const onChange=(e)=>{
       setNote({...note,[e.target.name]:e.target.value}) //add or overwrite [e.targer.name ->name]=e.target.value -> (tiger) -->overwrite in ...note 
    }
  return (
    <div>
      <div className="container my-3">
            <h2>Add a Note</h2>
            <form>
                <div className="mb-3">   
                    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" value={note.title} onChange={onChange} />
                
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Describtion</label>
                    <input type="text" className="form-control" id="describtion" name='describtion' value={note.describtion}  onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' value={note.tag}  onChange={onChange}/>
                </div>
                
                <button disabled={note.title.length<5||note.describtion.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add note</button>
            </form>
            </div>
    </div>
  )
}
