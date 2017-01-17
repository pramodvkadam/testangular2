export class TabCount {
    constructor(Name?: string,
                Count?: string) {
    }
}

export class AccountInfo {
    constructor(public Id?: string,
                public Name?: string,
                public EmailAddress1?: string,
                public EmailAddress2?: string,
                public EmailAddress3?: string,
                public Telephone1?: string,
                public Telephone2?: string,
                public Telephone3?: string,
                public Status?: string,
                public ContactPersonName?: string,
                public ContactPersonEmail?: string,
                public WebsiteUrl?: string,
                public AddressLine1?: string,
                public AddressLine2?: string,
                public AddressLine3?: string,
                public City?: string,
                public Country?: string,
                public  PostalCode?: string,
                public Image?: string,
                public FavouriteId?: string,
                public TabCounts?: TabCount[]) {
    }
}