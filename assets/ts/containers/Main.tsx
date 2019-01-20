import { h } from 'preact';
import actions from '../actions';
import { connect } from 'redux-zero/preact';
import SharedTodoList from './SharedTodoList';
import { Todo } from '../interfaces';

export interface State {
    todos: Array<Todo>;
}

interface Props {
    _addTodo: Function;
    _deleteTodo: Function;
    _checkTodo: Function;
    _uncheckTodo: Function;
    _getAllTodos: Function;
    todos: Array<Todo>;
}

const mapToProps = ({ todos }: State) => ({ todos });

const Main = connect(
    mapToProps,
    actions
)(
    ({
        todos,
        _addTodo,
        _deleteTodo,
        _checkTodo,
        _uncheckTodo,
        _getAllTodos
    }: Props) => (
        <SharedTodoList
            todos={todos}
            addTodo={_addTodo}
            deleteTodo={_deleteTodo}
            checkTodo={_checkTodo}
            uncheckTodo={_uncheckTodo}
            getAllTodos={_getAllTodos}
        />
    )
);
//);

export default Main;
