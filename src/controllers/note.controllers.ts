import type { Context } from "elysia";
import { Note } from "../models";
import { jwt } from "../utils";

/**
 * @api [POST] /notes
 * @description: create a new note
 * @action public
 */
export const createNote = async (c: Context) => {
  if (!c.body) throw new Error("no body provided");

  const { title, text } = c.body as NoteBody;

  const _note = await Note.create({
    title,
    text,
  });

  if (!_note) {
    c.set.status = 400;
    throw new Error("invalid user data!");
  }

  c.set.status = 201;
  return {
    status: c.set.status,
    success: true,
    message: `${_note.title} note created successfully`,
  };
};

/**
 * @api [GET] /notes
 * @description: Get all notes
 * @action public
 */
export const getNotes = async (c: Context) => {
  const notes = await Note.find({});

  if (!notes || notes.length === 0) {
    c.set.status = 404;
    throw new Error("No notes found!");
  }

  return {
    status: c.set.status,
    success: true,
    data: notes,
    message: "notes fetched successfully",
  };
};

/**
 * @api [PUT] /note/:id
 * @description: Update a single note
 * @action public
 */
export const updateNote = async (c: Context<{ params: { id: string } }>) => {
  if (c.params && !c.params?.id) {
    c.set.status = 400;
    throw new Error("No id provided");
  }

  if (!c.body) throw new Error("No body provided");

  const { title, text } = c.body as NoteBody;

  const note = await Note.findById(c.params.id);
  if (!note) {
    c.set.status = 404;
    throw new Error("note not found!");
  }
  note.title = title || note.title;
  note.text = text || note.text;
  const updatedNote = await note.save();
  //   Note.findOneAndUpdate({ _id: uID }, req.body)

  if (!updatedNote) {
    c.set.status = 400;
    throw new Error("invalid note data!");
  }

  return {
    status: c.set.status,
    success: true,
    data: updatedNote,
    message: "note updated successfully",
  };
};

/**
 * @api [DELETE] /note/:id
 * @description: Delete a single note
 * @action public
 */
export const deleteNote = async (c: Context<{ params: { id: string } }>) => {
  if (c.params && !c.params?.id) {
    c.set.status = 400;
    throw new Error("No id provided");
  }

  const note = await Note.findOneAndDelete({ _id: c.params.id });

  if (!note) {
    c.set.status = 404;
    throw new Error("note not found!");
  }

  return {
    status: c.set.status,
    success: true,
    data: note,
    message: `Delete note with id ${c.params.id}`,
  };
};
