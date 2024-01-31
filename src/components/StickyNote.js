import React from 'react';

function StickyNote({ note, onUpdate, onDelete }) {

    // Use the note's id to generate unique id and name attributes
    const textareaId = `note-${note.id}`;

    return (
        <div className='sticky-note'>
            <textarea
                id={textareaId}
                name={textareaId}
                defaultValue={note.text}
                onBlur={(e) => onUpdate(note.id, e.target.value )}
            />
            <button onClick={() => onDelete(note.id)} className="delete-note">X</button>
        </div>
    )
}

export default StickyNote;