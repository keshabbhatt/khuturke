import db from "./db";

export function createNote(newBudget) {
	return db.notes.add(newBudget);
}

export function updateNote(note) {
	return db.notes.put(note);
}

export function deleteNote(noteId) {
	return db.notes.delete(noteId);
}

export function getNoteById(noteId) {
	return db.notes.get(noteId);
}

export function getAllNotes() {
	return db.table("notes").toArray();
}
