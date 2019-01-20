import createStore from 'redux-zero';
import { applyMiddleware } from 'redux-zero/middleware';
import { LOADING } from './const';
import { Todo } from './interfaces';
import { createSocketMiddleware } from './middleware';
import { initializeSocketConnection } from './utils/socket';

interface State {
    todos: Array<Todo>;
    status: string;
}

const initialState: State = { todos: [], status: LOADING };

const middlewares = applyMiddleware(
    createSocketMiddleware(initializeSocketConnection())
);
const store = createStore(initialState, middlewares);
export default store;
