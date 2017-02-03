export class Response {
    constructor(public ResponseId?: string,
                public AccountId?: string,
                public AccountName?: string,
                public ContactId?: string,
                public ContactName?: string,
                public Name?: string,
                public Status?: string,
                public Code?: string,
                public ActionCodeId?: string,
                public ActionCrossCodeId?: string,
                public ActionResponseId?: string,
                public LinkTo?: string,
                public CrossCode?: string,
                public Description?: string,
                public ModifiedBy?: string,
                public Date?: any,
                public ModifiedOn?: any,
                public OwnerName?: string,
                public ResponseCode?: string) {
    }
}
