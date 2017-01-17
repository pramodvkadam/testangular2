export class Attachments {
    constructor(private Id: string,
                public FileType: string,
                public Size: string,
                public Name: string,
                public Label: string,
                public Data: string,
                public CreatedDate: Date,
                public SecurityLevelId: string,
                public SecurityLevel: string,
                public LabelId: string,
                public CreatedBy: string,
                public FilePath: string,
                public LinkTos: {}) {
    }
}

export class Email {
    constructor(private Id: string,
                public FromName: string,
                public FromEmailAddress: string,
                public ToName: string,
                public ToEmailAddress: string,
                public Subject: string,
                public Body: string,
                public Date: Date,
                public Label: string,
                public Attachments: Attachments[]) {
    }
}
