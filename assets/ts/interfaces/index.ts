export interface Todo {
    id: string;
    text: string;
    status: TodoStatus;
}

export enum TodoStatus {
    TODO = 0,
    DONE = 1
}
