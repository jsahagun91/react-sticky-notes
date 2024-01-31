import React, { useEffect, useState } from 'react';
import StickyNote from "./StickyNote";

function Board() {
    const [notes, setNotes ] = useState([]);

    useEffect(() => {
        try {
            const savedNotes = JSON.parse(localStorage.getItem('stickyNotes'));
            if (savedNotes) {
                setNotes(savedNotes);
            }
        } catch (error) {
            console.error("Error loading notes from localStorage:", error);
        }
    }, []);

    // Load notes from localStorage
    useEffect(() => {
        const savedNotes = JSON.parse(localStorage.getItem('stickyNotes'));
        if (savedNotes) {
            setNotes(savedNotes);
        }
    }, []);

    // Save notes to localStorage
    useEffect(() => {
        localStorage.setItem('stickyNotes', JSON.stringify(notes));
    }, [notes]);

    const addNote = () => {
        const newNote = {
            id: Date.now(),
            text: ''
        };
        setNotes(prevNotes => [...prevNotes, newNote]);
    };

    const updateNote = (id, text) => {
        const updatedNotes = notes.map(note => 
            note.id === id ? { ...note, text } : note 
        )
        setNotes(updatedNotes);
    }

    // method for deleting notes
    const deleteNote = (id) => {
        const filteredNotes = notes.filter(note => note.id !== id);
        setNotes(filteredNotes);
    };

    return (
        <div>
            <div className='board-container'>
                <div className='add-note-container'>
                    <button onClick={addNote}>Add Note</button>
                </div>
                <div className='notes-container'>
                    {notes.map(note => (
                        <StickyNote key={note.id} note={note} onUpdate={updateNote} onDelete={deleteNote} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Board;