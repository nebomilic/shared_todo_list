import { h, Component } from 'preact';
import TodoList from '../components/TodoList';
import { Todo } from '../interfaces';

interface Props {
    addTodo: Function;
    deleteTodo: Function;
    checkTodo: Function;
    uncheckTodo: Function;
    getAllTodos: Function;
    todos: Array<Todo>;
}

export interface State {
    todos: Array<Todo>;
}
export default class SharedTodoList extends Component<Props, State> {
    componentWillMount() {
        this.props.getAllTodos();
    }

    render() {
        return (
            <TodoList
                todos={this.props.todos}
                addTodo={this.props.addTodo}
                deleteTodo={this.props.deleteTodo}
                checkTodo={this.props.checkTodo}
                uncheckTodo={this.props.uncheckTodo}
            />
        );
    }
}
