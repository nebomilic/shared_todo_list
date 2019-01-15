import createStore from 'redux-zero';
import { LOADING } from './const';
import { Todo } from './interfaces';

interface State {
    todos: Array<Todo>;
    status: string;
}

const initialState: State = { todos: [], status: LOADING };
const store = createStore(initialState);

export default store;
