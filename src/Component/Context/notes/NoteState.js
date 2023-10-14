import React from 'react'
import { useState } from 'react'
import noteContext from './noteContext'

const NoteState=(props)=>{
  const host="http://localhost:5000"
  const notesInitial=[]
    const [notes,setNotes]=useState(notesInitial);
    
    // Get a note
    const getNotes=async()=>{
  
     
      const response= await fetch(`${host}/api/notes/fetchallnotes`,{
        method:'GET',
        headers:{
          "Content-Type":"application/json",
          "auth-token":localStorage.getItem("token")
        },
      })
      const json=await response.json();
      setNotes(json);
    }
   // Add a note
   const addNote=async(title,describtion,tag)=>{
    const response= await fetch(`${host}/api/notes/addnote`,{
      method:'POST',
      headers:{
        "Content-Type":"application/json",
        "auth-token":localStorage.getItem("token")
      },
      body:JSON.stringify({title:title,describtion:describtion,tag:tag})
    })

    const note=await response.json();
      setNotes(notes.concat(note))
      props.showAlert("new note add","success");
  }
    // Delete a note
    const deleteNote=async(id)=>{
 
      const newNotes=notes.filter((note)=>{return note._id!==id})
        setNotes(newNotes)
        const response= await fetch(`${host}/api/notes/deletenote/${id}`,{
          method:'DELETE',
          headers:{
            "Content-Type":"application/json",
            "auth-token":localStorage.getItem("token")
          }
        })
        const json=await response.json();
        console.log(json);
        props.showAlert("note is deleted","success");
    }

    
    // Edit a note
    const EditNote=async(id,title,describtion,tag )=>{
      // api call
 
      const response= await fetch(`${host}/api/notes/updatenote/${id}`,{
        method:'PUT',
        headers:{
          "Content-Type":"application/json",
          "auth-token":localStorage.getItem("token")
        },
        body:JSON.stringify({title,describtion,tag})
      })
      const json=await response.json();
      props.showAlert("do want to edit this note","warning");
      let newnotes=JSON.parse(JSON.stringify(notes))
      // logic to edit in client
      for(let i=0;i<newnotes.length;i++){
        const element=newnotes[i];
        if(element._id===id){
          newnotes[i].title=title;
          newnotes[i].describtion=describtion;
          newnotes[i].tag=tag;
          break;
        }
      }
      setNotes(newnotes)
    }
     return(
           <noteContext.Provider value={{notes,addNote,deleteNote,EditNote,getNotes}}>
            {props.children}
           </noteContext.Provider>
     )
}

export default NoteState;