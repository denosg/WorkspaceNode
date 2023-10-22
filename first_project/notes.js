const fs = require('fs');

const getNotes = () => {
}

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title);

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body,
        });
        saveNotes(notes);
        console.log('New note added');
    } else {
        console.log('This note has already been added !');
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    const indexToRemove = notes.findIndex((note) => note.title === title);

    if (indexToRemove >= 0 && indexToRemove < notes.length) {
        console.log(`${notes[indexToRemove].title} has been removed.`);
        notes.splice(indexToRemove, 1);
        saveNotes(notes);
    } else {
        console.log('This note is not in the list.');
    }
}

const readNote = (title) => {
    const notes = loadNotes();
    const indexToRemove = notes.findIndex((note) => note.title === title);

    if (indexToRemove >= 0 && indexToRemove < notes.length) {
        console.log(`${notes[indexToRemove].title}`);
    } else {
        console.log('This note is not in the list.');
    }
}

const saveNotes = (notes) => {
    const dataJson = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJson);
}

const listNotes = () => {
    const notes = loadNotes();
    console.log('Your notes: ');
    notes.forEach(note => {
        console.log(`title: ${note.title} body: ${note.body}`);
    });
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJson = dataBuffer.toString();
        return JSON.parse(dataJson);
    } catch (err) {
        return [];
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote,
}