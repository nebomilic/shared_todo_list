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
        /*this.loadExistingTodos();
        SharedTodoChannel.get().on('added_todo', (msg: any) => {
            const newTodo: Todo = JSON.parse(msg.body) as Todo;
            const updatedTodos = [newTodo, ...this.state.todos];
            this.setState({ todos: updatedTodos });
            console.log('New todo added');
        });
        SharedTodoChannel.get().on('deleted_todo', (msg: any) => {
            const deletedTodoId: string = msg.body;
            const updatedTodos = this.state.todos.filter(
                item => item.id !== deletedTodoId
            );
            this.setState({ todos: updatedTodos });
            console.log('A todo was deleted');
        });

        SharedTodoChannel.get().on('checked_todo', (msg: any) => {
            const checkedTodoId: string = msg.body;
            const updatedTodos = this.state.todos.map(item =>
                item.id === checkedTodoId
                    ? { ...item, status: TodoStatus.DONE }
                    : item
            );
            this.setState({ todos: updatedTodos });
            console.log('A todo was checked');
        });

        SharedTodoChannel.get().on('unchecked_todo', (msg: any) => {
            const checkedTodoId: string = msg.body;
            const updatedTodos = this.state.todos.map(item =>
                item.id === checkedTodoId
                    ? { ...item, status: TodoStatus.TODO }
                    : item
            );
            this.setState({ todos: updatedTodos });
            console.log('A todo was unchecked');
        });*/
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
