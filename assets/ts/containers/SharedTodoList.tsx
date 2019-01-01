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
    
    }

    addTodo = (text: string) => {
        const newTodo : TodoItem = {id:0, text: text, status: TodoStatus.TODO}
        const updatedTodos = [...this.state.todos, newTodo];
        this.setState({ todos: updatedTodos });
    }

    state: State = {todos: []}
   
    componentWillMount() {
        connectToChannel(`${TOPIC}:${SUBTOPIC}`);
    }

    render() {
        return (
            <TodoList todos={this.state.todos} addTodo={this.addTodo}/>
        );
    }
}