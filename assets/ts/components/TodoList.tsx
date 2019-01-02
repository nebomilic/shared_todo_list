import { h, Component } from 'preact';
import { Todo } from '../containers/SharedTodoList';

interface State {
    text: string
}

interface Props {
    todos: Array<Todo>,
    addTodo: Function,
    deleteTodo: Function
}

export default class TodoList extends Component <Props> {
    state: State = {text: '' };
    setText = (e: any) => 
        this.setState({ text: e.target.value });

    render() {
        const { text } = this.state;
        const { todos, addTodo, deleteTodo } = this.props;
        return (
            <div>
                <input id='todoInput' value={text} onInput={this.setText} />
                <button onClick={()=> addTodo(text)}>Add</button>
                <ul>
                    {todos.map((todo) => (
                        <li onClick={()=> deleteTodo(todo.id)}>{todo.text}</li>
                    ))}
                </ul>
            </div>
        );
    }
}