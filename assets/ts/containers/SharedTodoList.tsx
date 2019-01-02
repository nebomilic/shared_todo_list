import { h, Component } from 'preact';
import TodoList from '../components/TodoList';
import { connectToChannel } from '../utils/socket';
import { TOPIC, SUBTOPIC } from '../config';
import { Channel } from 'phoenix';

export interface Todo {
    id: number,
    text: string,
    status: TodoStatus
}

export enum TodoStatus {
    TODO = 0,
    DONE = 1
}

export interface State {
    todos: Array<Todo>
}


export default class SharedTodoList extends Component {
    
    state: State = {todos: []};
    channel: Channel = connectToChannel(`${TOPIC}:${SUBTOPIC}`);

    loadExistingTodos = () => {
        
        this.channel.push('get_all_todos', {}, 10000) 
                    .receive('ok', (msg: any) => {
                        const todos:Array<Todo> = (JSON.parse(msg.body) as Array<Todo>);
                        this.setState({todos: todos});
                    })
                    .receive('error', (reasons) => console.log('create failed', reasons) )
                    .receive('timeout', () => console.log('Networking issue...') )

    }

    addTodo = (text: string) => {
        this.channel.push('add_todo', {todo_text: text}, 10000) 
        .receive('ok', (msg) => console.log('created message', msg) )
        .receive('error', (reasons) => console.log('create failed', reasons) )
        .receive('timeout', () => console.log('Networking issue...') )
    }
    
    
    componentWillMount() {
        
        this.loadExistingTodos();
        this.channel.on('added_todo', ( msg: any)  => {
            const newTodo:Todo = (JSON.parse(msg.body) as Todo);
            const updatedTodos = [...this.state.todos, newTodo];
            this.setState({ todos: updatedTodos });
            console.log('New todo added');
        } )
        this.channel.on('deleted_todo', ( msg: any)  => console.log('Todo was deleted', msg) )
    }

    render() {
        return (
            <TodoList todos={this.state.todos} addTodo={this.addTodo}/>
        );
    }
}