import {Component, OnInit, Input} from "@angular/core";
import {MemoService} from "./memo.service";
import {Note} from "./note";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {ToastsManager} from "ng2-toastr";
import {AuthService} from "../../shared/auth.service";

@Component({
    selector: 'acsi-notes',
    templateUrl: './notes.component.html',
    styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

    @Input()
    entityType: number;
    @Input()
    entityId: string;
    @Input()
    showNote: boolean;
    fields: any;
    note: Note;
    active: boolean = false;
    noteForm: FormGroup;
    notes: Note[] = [];

    constructor(private memoService: MemoService,
                private _formBuilder: FormBuilder,
                public toastr: ToastsManager,
                private authService: AuthService) {
    }

    ngOnInit() {
        this.memoService.getNotes(this.entityId).subscribe(
            notes => this.notes = notes,
            error => {
                let errors = error.json();
                this.toastr.error(errors.ExceptionMessage);
            });
        this.resetNote();
    }

    resetNote() {
        this.note = new Note();
        this.note.EntityId = this.entityId;
        this.note.NoteEntityType = this.entityType;
        this.active = false;
        setTimeout(() => this.active = true, 0);
        this.initForm();
    }

    onNoteSubmit() {
        const newNote = this.noteForm.value;
        this.memoService.saveNote(newNote)
            .subscribe(response => {
                if (response) {
                    this.note.Id = response;
                    this.note.NoteText = this.noteForm.value.NoteText;
                    this.note.Owner = this.authService.getLoggedInUser();
                    this.note.CreatedOn = new Date();
                    this.notes.unshift(this.note);
                    this.resetNote();
                    this.toastr.info("Note added/updated successfully!");
                } else {
                    console.log(response);
                    this.toastr.error(response.ExceptionMessage);
                }
            }, error => {
                let errors = error.json();
                this.toastr.error(errors.ExceptionMessage);
            })
    }

    deleteNote(noteId: string, index: number) {
        let confirmation = confirm("Are you sure to delete Note!");
        if (confirmation) {
            this.memoService.deleteNoteById(noteId)
                .subscribe(response => {
                    if (response === true) {
                        this.notes.splice(index, 1);
                        this.toastr.info("Note deleted successfully!");
                    }
                }, error => {
                    let errors = error.json();
                    this.toastr.error(errors.ExceptionMessage);
                })
        }
    }

    selectNote(note: Note) {
        this.note = note;
    }

    private initForm() {
        this.noteForm = this._formBuilder.group({
            Owner: [this.note.Owner],
            NoteText: [this.note.NoteText, Validators.required],
            EntityId: [this.note.EntityId, Validators.required],
            NoteEntityType: [this.note.NoteEntityType, Validators.required]
        });
    }
}
