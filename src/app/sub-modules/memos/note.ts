export class Note {
    constructor(public Id?: string,
                public Owner?: string,
                public NoteText?: string,
                public EntityId?: string,
                public NoteEntityType?: number,
                public CreatedOn?: any) {
    }
}
