import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = (props) => {
    const context = useContext(noteContext);
    const {addNote}= context;
    const [note,setNote]=useState({title:" ",description: " ",tag: " "})
    const onChange=(e)=>{
         setNote({...note, [e.target.name] : e.target.value})
    }
    const handleClick=(e)=>{
       e.preventDefault();
       addNote(note.title, note.description, note.tag)
       setNote({title:" ",description: " ",tag: " "})
       props.showAlert("Added Successfully","success")
    }
    return (
        <div>
            <div className='container my-3'>
                <h1>Add a Note</h1>
                <form className='my-3'>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" onChange={onChange} value={note.title} id="title" name="title" aria-describedby="emailHelp" minLength={5} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" onChange={onChange} value={note.description} id="description" name="description" minLength={5} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" onChange={onChange} value={note.tag} id="tag" name="tag" minLength={5} required/>
                    </div>
                  
                    <button disabled={ note.title.length<5 || note.description.length<5 } type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
