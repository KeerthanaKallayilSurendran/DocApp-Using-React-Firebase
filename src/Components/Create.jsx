import React, { useState } from 'react';
import { Box, Button, Modal, TextField } from '@mui/material';
import database from '../Database/FirebaseConfig'
import { collection, addDoc } from 'firebase/firestore'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: "5px",
    boxShadow: 24,
    p: 4,
    textAlign: "center"
};

const Create = ({ onNoteAdded }) => {
    const [open, setOpen] = useState(false);
    const [note, setNote] = useState({ title: "", content: "", plainText: "" });

    const value = collection(database, "notes")
    const handleAddContent = async () => {
        await addDoc(value, note);
        handleClose();
        onNoteAdded(); // Call the callback to refetch data in View
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setNote({ title: "", content: "", plainText: ""}); // Reset note state
    };

    return (
        <>
            <div className='pt-32 p-5 text-white'>
                <Button onClick={handleOpen} className='float-end' variant="contained">
                    <i className="fa-solid fa-file-circle-plus text-2xl"></i>
                </Button>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <TextField
                        required
                        id="outlined-required"
                        label='Title'
                        placeholder='Enter your Note Title'
                        fullWidth
                        value={note.title}
                        onChange={e => setNote({ ...note, title: e.target.value })}
                    />
                    <div className='mt-5'>
                        <Button variant="outlined" onClick={handleAddContent}>Add</Button>
                    </div>
                </Box>
            </Modal>
        </>
    );
};

export default Create;
