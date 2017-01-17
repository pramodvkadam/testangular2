export class ContactPerson {
    constructor(public AccountId?: string,
                public SourceKey?: string,
                public ContactId?: string,
                public Gender?: string,
                public Title?: string,
                public FirstName?: string,
                public LastName?: string,
                public Insertion?: string,
                public Initials?: string,
                public Department?: string,
                public JobTitle?: string,
                public EmailAddress1?: string,
                public EmailAddress2?: string,
                public EmailAddress3?: string,
                public LanguageId?: string,
                public Language?: string,
                public Status?: string,
                public PhoneNumber?: string,
                public MobileNumber?: string,
                public Fax?: string,
                public Emails?: string[]) {
    }
}
