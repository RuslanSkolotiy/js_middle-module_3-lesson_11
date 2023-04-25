// db.ts
import Dexie, { Table } from 'dexie';

export interface Notes {
    id?: number;
    title: string;
    text: string;
    additionDate: Date;
    modificationDate: Date;
}

export class MySubClassedDexie extends Dexie {
    notes!: Table<Notes>;
    constructor() {
        super('notesDatabase');
        this.version(1).stores({
            notes: '++id, title, text'
        });
    }
}

export const db = new MySubClassedDexie();