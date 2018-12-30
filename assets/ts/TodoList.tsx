import { h, Component } from 'preact';

interface State {
    todos: string[],
    text: string
}

export default class TodoList extends Component {
    state: State = { todos: [], text: '' };
    setText = (e: any) => 
        this.setState({ text: e.target.value });

    addTodo = () => {
        const { todos, text } = this.state;
        const updatedTodos = [...todos, text];
        this.setState({ todos: updatedTodos, text: '' });
    };

    render() {
        const { todos, text } = this.state;
        return (
            <div>
                <input value={text} onInput={this.setText} />
                <button onClick={this.addTodo}>Add</button>
                <ul>
                    {todos.map((todo) => (
                        <li>{todo}</li>
                    ))}
                </ul>
            </div>
        );
    }
}