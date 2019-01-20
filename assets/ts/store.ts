import createStore from 'redux-zero';
import { applyMiddleware } from 'redux-zero/middleware';
import { LOADING } from './const';
import { Todo } from './interfaces';
import { createSocketMiddleware, SocketToActionMapping } from './middleware';
import { initializeSocketConnection } from './utils/socket';
import Store from 'redux-zero/interfaces/Store';

interface State {
    todos: Array<Todo>;
    status: string;
}

const socketToActionMappings: SocketToActionMapping = {
    added_todo: 'todoWasAdded',
    deleted_todo: 'todoWasDeleted',
    checked_todo: 'todoWasChecked',
    unchecked_todo: 'todoWasUnchecked'
};

const loggerMiddleware = (_: Store) => (next: any) => (action: any) => {
    console.log(`Executing action ${action.name}`);
    return next(action);
};

const initialState: State = { todos: [], status: LOADING };

const middlewares = applyMiddleware(
    loggerMiddleware,
    createSocketMiddleware(initializeSocketConnection(), socketToActionMappings)
);
const store = createStore(initialState, middlewares);
export default store;
