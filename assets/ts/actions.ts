import Store from 'redux-zero/interfaces/Store';
import { State } from './containers/SharedTodoList';

const actions: any = (_store: Store) => ({
    getAllTodos(_state: State) {
        console.log('***** alright! ****');
        return { todos: [] };
    },
    addTodo(_state: State) {
        console.log('***** adding! alright! ****');
        return { todos: [] };
    },
    deleteTodo: (_state: State) => ({ todos: [] }),
    checkTodo: (_state: State) => ({ todos: [] }),
    uncheckTodo: (_state: State) => ({ todos: [] }),
    todoWasAdded: (_state: State) => ({ todos: [] }),
    todoWasDeleted: (_state: State) => ({ todos: [] }),
    todoWasChecked: (_state: State) => ({ todos: [] }),
    todoWasUnchecked: (_state: State) => ({ todos: [] })
    //TODO: add more actions for error handling
});
export default actions;
