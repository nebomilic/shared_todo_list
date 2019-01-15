import Store from 'redux-zero/interfaces/Store';
import { State } from './containers/SharedTodoList';
import { SharedTodoChannel } from './utils/socket';
import store from './store';
import { TodoStatus, Todo } from './interfaces';

const REPLY_OK: string = 'ok';
const REPLY_ERROR: string = 'error';
const REPLY_TIMEOUT: string = 'timeout';

const MESSAGE_GET_ALL_TODOS: string = 'get_all_todos';
const MESSAGE_ADD_TODO: string = 'add_todo';
const MESSAGE_DELETE_TODO: string = 'delete_todo';
const MESSAGE_CHECK_TODO: string = 'check_todo';
const MESSAGE_UNCHECK_TODO: string = 'uncheck_todo';

const actions: any = (_store: Store) => ({
    getAllTodos(_state: State) {
        console.log('getting all todos');
        SharedTodoChannel.get()
            .push(MESSAGE_GET_ALL_TODOS, {}, 10000)
            .receive(REPLY_OK, (msg: any) => {
                const todos: Array<Todo> = JSON.parse(msg.body) as Array<Todo>;
                store.setState({ todos: todos });
            })
            .receive(REPLY_ERROR, reasons =>
                console.log('create failed', reasons)
            )
            .receive(REPLY_TIMEOUT, () => console.log('Networking issue...'));
    },
    addTodo(_state: State, todoText: string) {
        console.log('***** adding! alright! ****');
        SharedTodoChannel.get()
            .push(MESSAGE_ADD_TODO, { todo_text: todoText }, 10000)
            .receive(REPLY_OK, msg => console.log('created message', msg))
            .receive(REPLY_ERROR, reasons =>
                console.log('create failed', reasons)
            )
            .receive(REPLY_TIMEOUT, () => console.log('Networking issue...'));
    },
    deleteTodo(_state: State, todoId: string) {
        console.log('***** deleting todo! alright! ****');
        SharedTodoChannel.get()
            .push(MESSAGE_DELETE_TODO, { todo_id: todoId }, 10000)
            .receive(REPLY_OK, msg => console.log('created message', msg))
            .receive(REPLY_ERROR, reasons =>
                console.log('create failed', reasons)
            )
            .receive(REPLY_TIMEOUT, () => console.log('Networking issue...'));
    },
    checkTodo(_state: State, todoId: string) {
        console.log('***** checking todo! alright! ****');
        SharedTodoChannel.get()
            .push(MESSAGE_CHECK_TODO, { todo_id: todoId }, 10000)
            .receive(REPLY_OK, msg => console.log('created message', msg))
            .receive(REPLY_ERROR, reasons =>
                console.log('create failed', reasons)
            )
            .receive(REPLY_TIMEOUT, () => console.log('Networking issue...'));
    },
    uncheckTodo(_state: State, todoId: string) {
        console.log('***** checking todo! alright! ****');
        SharedTodoChannel.get()
            .push(MESSAGE_UNCHECK_TODO, { todo_id: todoId }, 10000)
            .receive(REPLY_OK, msg => console.log('created message', msg))
            .receive(REPLY_ERROR, reasons =>
                console.log('create failed', reasons)
            )
            .receive(REPLY_TIMEOUT, () => console.log('Networking issue...'));
    },
    todoWasAdded: (_state: State, msg: any) => {
        const newTodo: Todo = JSON.parse(msg.body) as Todo;
        const updatedTodos = [newTodo, ...this.state.todos];
        console.log('New todo added');
        return { todos: updatedTodos };
    },
    todoWasDeleted: (_state: State, msg: any) => {
        const deletedTodoId: string = msg.body;
        const updatedTodos = this.state.todos.filter(
            (item: Todo) => item.id !== deletedTodoId
        );
        return { todos: updatedTodos };
    },
    todoWasChecked: (_state: State, msg: any) => {
        const checkedTodoId: string = msg.body;
        const updatedTodos = this.state.todos.map((item: Todo) =>
            item.id === checkedTodoId
                ? { ...item, status: TodoStatus.DONE }
                : item
        );
        return { todos: updatedTodos };
    },
    todoWasUnchecked: (_state: State, msg: any) => {
        const checkedTodoId: string = msg.body;
        const updatedTodos = this.state.todos.map((item: Todo) =>
            item.id === checkedTodoId
                ? { ...item, status: TodoStatus.TODO }
                : item
        );
        return { todos: updatedTodos };
    }
    //TODO: add more actions for error handling
});
export default actions;
