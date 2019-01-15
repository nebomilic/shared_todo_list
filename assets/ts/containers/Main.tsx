import { h } from 'preact';
import actions from '../actions';
import { connect } from 'redux-zero/preact';
import SharedTodoList from './SharedTodoList';
import { Todo } from '../interfaces';

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
