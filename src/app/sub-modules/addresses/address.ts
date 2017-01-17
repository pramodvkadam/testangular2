export class Address {
    constructor(public ParentId?: string,
                public AddressType?: number,
                public Street?: string,
                public PostBoxNumber?: string,
                public Country?: string,
                public CountryId?: string,
                public Location?: string,
                public ZipCode?: string,
                public City?: string,
                public HouseNumber?: string,
                public AddressId?: string,
                public EntityType?: number,
                public ModifiedByName?: string,
                public ModifiedOn?: string) {
    }
}
