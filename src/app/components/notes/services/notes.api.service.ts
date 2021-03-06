import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { AppStore } from '../../../app-store.model';
import { Note } from '../note';

import * as NotesActions from  '../../../actions/note';
import * as fromRoot from '../../../reducers';
import * as fromNotes from '../../../reducers/notes';

@Injectable()
export class NotesApiService {

  constructor(private store: Store<fromRoot.State>) {
    this.store.dispatch(new NotesActions.fetchNotes());
  }

  getNotes(): Observable<Note[]> {
    return this.store.select(fromNotes.getNotes);
  }

  addNote(newNote: Note) {
    return this.store.dispatch(new NotesActions.createNote(newNote));
  }

  deleteNote(note: Note) {
    this.store.dispatch(new NotesActions.deleteNote(note));
  }

  changeNoteText(note: Note) {
    this.store.dispatch(new NotesActions.updateNoteText(note));
  }

  changeNotePosition(note: Note): void {
    this.store.dispatch(new NotesActions.updateNotePosition(note));
  }

}
