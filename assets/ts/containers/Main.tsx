import { h } from 'preact';
import actions from '../actions';
import { Connect, connect } from 'redux-zero/preact';
import SharedTodoList from './SharedTodoList';

export interface Todo {
    id: string;
    text: string;
    status: TodoStatus;
}

export enum TodoStatus {
    TODO = 0,
    DONE = 1
}

export interface State {
    todos: Array<Todo>;
}

interface Props {
    addTodo: Function;
    deleteTodo: Function;
    checkTodo: Function;
    uncheckTodo: Function;
    getAllTodos: Function;
    todos: Array<Todo>;
}

const mapToProps = ({ todos }: State) => ({ todos });

const Main = connect(
    mapToProps,
    actions
)(
    ({
        todos,
        addTodo,
        deleteTodo,
        checkTodo,
        uncheckTodo,
        getAllTodos
    }: Props) => (
        <SharedTodoList
            todos={todos}
            addTodo={addTodo}
            deleteTodo={deleteTodo}
            checkTodo={checkTodo}
            uncheckTodo={uncheckTodo}
            getAllTodos={getAllTodos}
        />
    )
);
//);

export default Main;
