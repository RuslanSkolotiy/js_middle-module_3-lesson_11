import { createContext, useContext, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { Notes, db } from "../database/db";
import { IndexableType } from "dexie";

export enum workspaseModes {
    preview = 'preview',
    code = 'code',
    both = 'both'
}

type NotesContextType = {
    addNote: Function;
    getNote: Function;
    deleteNote: Function;
    updateNote: Function;
    getNotes: Function;
    showAddForm: boolean;
    setShowAddForm: Function;
    getFilteredNotes: Function;
    filter: string;
    setFilter: Function;
    showEditForm: boolean;
    setShowEditForm: Function;
    showDeleteForm: boolean;
    setShowDeleteForm: Function;
    workspaseMode: workspaseModes;
    setWorkspaseMode: Function;
}

const NotesContext = createContext<NotesContextType | null>(null);

export const useNotes = () => {
    const contextValue = useContext(NotesContext);
    if (contextValue === null) {
        throw Error("Context has not been Provided!");
    }
    return contextValue;
};

export default function NotesProvider({ children }: { children?: React.ReactNode }) {
    const [showAddForm, setShowAddForm] = useState<boolean>(false);
    const [showEditForm, setShowEditForm] = useState<boolean>(false);
    const [showDeleteForm, setShowDeleteForm] = useState<boolean>(false);
    const [workspaseMode, setWorkspaseMode] = useState<workspaseModes>(workspaseModes.preview);
    const [filter, setFilter] = useState<string>('');

    const addNote = async (title: string, text: string = '') => {
        const id = await db.notes.add({
            title,
            text,
            additionDate: new Date(),
            modificationDate: new Date()
        });
        return id
    }

    const getNote = (id: IndexableType): Notes | undefined => {
        const note: Notes | undefined = useLiveQuery(
            () => db.notes.get(id),
            [id]
        );
        return note;
    }

    const deleteNote = (id: IndexableType, callback: Function): void => {
        db.notes.delete(id);
        if (callback instanceof Function) {
            callback();
        }
    }

    const updateNote = (id: IndexableType, changes: Object): void => {
        db.notes.update(id, changes);
    }

    const getNotes = (): Notes[] => {
        const notes: Notes[] | undefined = useLiveQuery(
            () => db.notes.toArray()
        );
        return notes ?? [];
    }

    const getFilteredNotes = (): Notes[] => {
        const notes: Notes[] | undefined = useLiveQuery(
            () => db.notes.toArray()
        );
        return (notes ?? []).filter(item => {
            const lowerFilter: string = filter.toLocaleLowerCase();
            return item.title.toLocaleLowerCase().includes(lowerFilter) || item.text.toLocaleLowerCase().includes(lowerFilter)
        });
    }

    return (
        <NotesContext.Provider value={{ addNote, getNote, deleteNote, updateNote, getNotes, showAddForm, setShowAddForm, getFilteredNotes, filter, setFilter, showEditForm, setShowEditForm, showDeleteForm, setShowDeleteForm, workspaseMode, setWorkspaseMode }}>
            {children}
        </NotesContext.Provider>
    );
}