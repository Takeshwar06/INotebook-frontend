
import React from 'react'
import { useEffect,useRef,useState } from 'react';
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import AddNote from './AddNote';
import noteContext from './Context/notes/noteContext'
import Noteitem from './Noteitem';

export default function Notes(props) {
   const navigate=useNavigate();
  const context = useContext(noteContext)
  const { notes, getNotes,EditNote } = context;
  const [note,setNote]=useState({id:"",etitle:"",edescribtion:"",etag:""})

  useEffect(() => {
     if(localStorage.getItem('token')){
      getNotes();
     }else{
         navigate('/login');
     }
    // eslint-disable-next-line
  }, [])
  const updateNote = (currentNote) => {

    
    refOpen.current.click(); // this line is execute then automaticlly click event fire in ref <tag>
    setNote({id:currentNote._id,etitle:currentNote.title,edescribtion:currentNote.describtion,etag:currentNote.tag})
  }

  const handleClick=(note)=>{
       EditNote(note.id,note.etitle,note.edescribtion,note.etag);
       refClose.current.click()
       props.showAlert("your notes updated","success");

        
  }
  const onChange=(e)=>{
     setNote({...note,[e.target.name]:e.target.value}) //add or overwrite [e.target.name ->name]=e.target.value -> (tiger) -->overwrite in ...note 
  }


  const refOpen=useRef(null);
  const refClose=useRef(null);
  return (
    <>
      <AddNote />
      {/* modal ignore it to few time  */}
      <button ref={refOpen} type="button" className=" d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Launch demo modal
     </button>
      <div className="modal fade" id="exampleModal"  tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

            <form>
                <div className="mb-3">   
                    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                    <input value={note.etitle} type="text" className="form-control" id="etitle" name='etitle' aria-describedby="emailHelp" onChange={onChange} />
                
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Describtion</label>
                    <input  value={note.edescribtion}  type="text" className="form-control" id="edescribtion" name='edescribtion'  onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Tag</label>
                    <input value={note.etag} type="text" className="form-control" id="etag" name='etag'  onChange={onChange}/>
                </div>
            </form>

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" ref={refClose} data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<5||note.edescribtion.length<5} type="button" className="btn btn-primary"onClick={()=>{handleClick(note)}}>update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <h2>Your Notes</h2>
        <div className="container">
          {notes.length===0&&"no notes to display" }
        </div>
        {
          notes.map((note) => {
            return <Noteitem key={note._id} updateNote={updateNote} note={note} />
          })
        }
      </div>
    </>

  )
}
