import createStore from 'redux-zero';
import { Todo } from './containers/SharedTodoList';
import { LOADING } from './const';

interface State {
    todos: Array<Todo>;
    status: string;
}

const initialState: State = { todos: [], status: LOADING };
const store = createStore(initialState);

export default store;
