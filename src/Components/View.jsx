import React, { useState, useEffect } from 'react';
import { Box, Modal } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import database from '../Database/FirebaseConfig';
import { collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import Create from './Create';
import { stringify } from 'postcss';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    borderRadius: "5px",
    boxShadow: 24,
    p: 4,
    textAlign: "center"
};

const View = () => {
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState("");
    const [notes, setNotes] = useState([]);
    const [currentNote, setCurrentNote] = useState(null); // Track the note being edited

    // Function to fetch notes from Firestore
    const fetchCollectionData = async () => {
        try {
            const collectionRef = collection(database, 'notes');
            const snapshot = await getDocs(collectionRef);
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setNotes(data);
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    };

    // Fetch data on component mount
    useEffect(() => {
        fetchCollectionData();
    }, []);

    const handleOpen = (note) => {
        setCurrentNote(note);  // Set the note being edited
        setContent(note.content || "");  // Load content to the editor
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const handleNoteSave = async () => {
        if (currentNote) {
            const noteDoc = doc(database, "notes", currentNote.id);
            console.log(content);
            const parser = new DOMParser()
            const plainText = parser.parseFromString(content, "text/html").body.textContent

            await updateDoc(noteDoc, { content, plainText });


            alert("Note updated");
            fetchCollectionData();
            handleClose();
        }
    };

    const handleDelete = async (id) => {
        const deleteContent = doc(database, "notes", id);
        await deleteDoc(deleteContent);
        alert("Note deleted");
        fetchCollectionData();
    };

    return (
        <div>
            <Create onNoteAdded={fetchCollectionData} />

            <div className='flex flex-col justify-center items-center pt-16'>
                <h1 className='text-5xl font-bold text-green-600'>NOTES</h1>
                <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 grid-flow-row gap-4 mt-5">
                    {notes.length > 0 ? (
                        notes.map(note => (
                            <div key={note.id} className='rounded-md border shadow p-3 bg-yellow-400 w-52 h-40'>
                                <div className='flex justify-between items-center mb-2'>
                                    <h1 className='font-bold uppercase'>{note.title || "Title"}</h1>
                                    <div className='w-12 flex justify-between'>
                                        <button onClick={() => handleOpen(note)}><i className="fa-solid fa-file-pen"></i></button>
                                        <button onClick={() => handleDelete(note.id)}><i className="fa-solid fa-trash"></i></button>
                                    </div>
                                </div>
                                <div>{
                                    note.plainText && note.plainText.length > 100
                                        ? `${note.plainText.slice(0, 50)}...`
                                        : note.plainText || "No content available"
                                }</div>
                            </div>
                        ))
                    ) : (
                        <div className='text-2xl font-bold text-red-700'>No Notes added yet!!!</div>
                    )}
                </div>
            </div>

            {/* Edit Content Modal */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h2 className='font-bold text-lg mb-2'>{currentNote?.title || "Edit Note"}</h2>
                    <ReactQuill theme='snow' className='ql-editor' value={content} onChange={setContent} />
                    <button className='mt-5 bg-yellow-400 rounded px-5 py-1 text-lg font-bold text-emerald-900' onClick={handleNoteSave}>Save</button>
                </Box>
            </Modal>
        </div>
    );
};

export default View;

