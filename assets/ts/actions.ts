import Store from 'redux-zero/interfaces/Store';
import { State } from './containers/SharedTodoList';
import { TodoStatus, Todo } from './interfaces';
import { SocketAction } from './middleware';

const MESSAGE_GET_ALL_TODOS: string = 'get_all_todos';
const MESSAGE_ADD_TODO: string = 'add_todo';
const MESSAGE_DELETE_TODO: string = 'delete_todo';
const MESSAGE_CHECK_TODO: string = 'check_todo';
const MESSAGE_UNCHECK_TODO: string = 'uncheck_todo';

const actions: any = (_store: Store) => ({
    _getAllTodos(_state: State): SocketAction {
        return {
            payload: {},
            messageName: MESSAGE_GET_ALL_TODOS,
            nextActionName: 'getAllTodosHandleResult'
        };
    },
    _addTodo(todoText: string): SocketAction {
        return {
            payload: { todo_text: todoText },
            messageName: MESSAGE_ADD_TODO
        };
    },
    _deleteTodo(todoId: string): SocketAction {
        return {
            payload: { todo_id: todoId },
            messageName: MESSAGE_DELETE_TODO
        };
    },
    _checkTodo(todoId: string): SocketAction {
        return {
            payload: { todo_id: todoId },
            messageName: MESSAGE_CHECK_TODO
        };
    },
    _uncheckTodo(todoId: string): SocketAction {
        return {
            payload: { todo_id: todoId },
            messageName: MESSAGE_UNCHECK_TODO
        };
    },
    todoWasAdded: (state: State, msg: any) => {
        const newTodo: Todo = JSON.parse(msg.body) as Todo;
        const updatedTodos = [newTodo, ...state.todos];
        return { todos: updatedTodos };
    },
    todoWasDeleted: (state: State, msg: any) => {
        const deletedTodoId: string = msg.body;
        const updatedTodos = state.todos.filter(
            (item: Todo) => item.id !== deletedTodoId
        );
        return { todos: updatedTodos };
    },
    todoWasChecked: (state: State, msg: any) => {
        const checkedTodoId: string = msg.body;
        const updatedTodos = state.todos.map((item: Todo) =>
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
    },
    getAllTodosHandleResult: (_state: State, msg: any) => {
        const todos: Array<Todo> = JSON.parse(msg.body) as Array<Todo>;
        return { todos: todos };
    }
});

export default actions;
