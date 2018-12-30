import { h, render, Component } from 'preact';

interface State {
    todos: Array<any> | [],
    text: string
}

export default class TodoList extends Component {
    state: State = { todos: [], text: '' };
    setText = (e: any) => {
        this.setState({ text: e.target.value });
    };

    addTodo = () => {
        const { todos, text } = this.state;
        const updatedTodos = [...todos, text];
        this.setState({ todos: updatedTodos, text: '' });
    };

    render() {
        const {todos, text} = this.state;
        return (
            <form onSubmit={this.addTodo} action="javascript:">
                <input value={text} onInput={this.setText} />
                <button type="submit">Add</button>
                <ul>{/*

                    { todos.map( (todo: any) => (
                        <li>{todo.text}</li>
                        )) }
                    */}
                </ul>
            </form>
        );
    }
}