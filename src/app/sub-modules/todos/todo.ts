export class Todo {
    constructor(public TaskId?: string,
                public Description?: string,
                public Owner?: string,
                public OwnerId?: string,
                public OwnerName?: string,
                public TodoDate?: any,
                public Priority?: string,
                public StatusCode?: string,
                public IsDone?: boolean,
                public TaskEntityId?: string,
                public TaskEntityType?: number,
                public EntityId?: string,
                public EntityType?: number) {
    }
}
