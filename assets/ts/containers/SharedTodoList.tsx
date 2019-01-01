import { h, Component } from 'preact';
import TodoList from '../components/TodoList';
import { connectToChannel } from '../utils/socket';
import { TOPIC, SUBTOPIC } from '../config';

export interface TodoItem {
    id: number,
    text: string,
    status: TodoStatus
}

export enum TodoStatus {
    TODO,
    DONE
}

export interface State {
    todos: Array<TodoItem>
}


export default class SharedTodoList extends Component {
    
    loadExistingTodos = () => {
        const initTodos : Array<TodoItem> = [
            {id:0, text: 'Finish backend', status: TodoStatus.TODO},
            {id:0, text: 'Introduce immutable.js', status: TodoStatus.TODO},
            {id:0, text: 'Make frontend PWA', status: TodoStatus.TODO}
        ];
        this.setState({todos: initTodos});
    }

    addTodo = (text: string) => {
        const newTodo : TodoItem = {id:0, text: text, status: TodoStatus.TODO}
        const updatedTodos = [...this.state.todos, newTodo];
        this.setState({ todos: updatedTodos });
    }

    state: State = {todos: []}
   
    componentWillMount() {
        connectToChannel(`${TOPIC}:${SUBTOPIC}`);
        this.loadExistingTodos();
    }

    render() {
        return (
            <TodoList todos={this.state.todos} addTodo={this.addTodo}/>
        );
    }
}