import { h, Component } from 'preact';
import { connectToChannel } from '../utils/socket';
import { TOPIC, SUBTOPIC } from '../config';
import { Channel } from 'phoenix';
import TodoList from '../components/TodoList';

export interface Todo {
    id: string,
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

    deleteTodo = (id: string) => {
        this.channel.push('delete_todo', {todo_id: id}, 10000) 
        .receive('ok', (msg) => console.log('created message', msg) )
        .receive('error', (reasons) => console.log('create failed', reasons) )
        .receive('timeout', () => console.log('Networking issue...') )
    }

    checkTodo = (id: string) => {
        this.channel.push('check_todo', {todo_id: id}, 10000) 
        .receive('ok', (msg) => console.log('created message', msg) )
        .receive('error', (reasons) => console.log('create failed', reasons) )
        .receive('timeout', () => console.log('Networking issue...') )
    }
    uncheckTodo = (id: string) => {
        this.channel.push('uncheck_todo', {todo_id: id}, 10000) 
        .receive('ok', (msg) => console.log('created message', msg) )
        .receive('error', (reasons) => console.log('create failed', reasons) )
        .receive('timeout', () => console.log('Networking issue...') )
    }
    
    
    componentWillMount() {
        
        this.loadExistingTodos();
        this.channel.on('added_todo', ( msg: any)  => {
            const newTodo:Todo = (JSON.parse(msg.body) as Todo);
            const updatedTodos = [newTodo, ...this.state.todos ];
            this.setState({ todos: updatedTodos });
            console.log('New todo added');
        } )
        this.channel.on('deleted_todo', ( msg: any)  => {
            const deletedTodoId:string = msg.body;
            const updatedTodos = this.state.todos.filter(item => item.id !== deletedTodoId);
            this.setState({ todos: updatedTodos });
            console.log('A todo was deleted');

        })

        this.channel.on('checked_todo', ( msg: any)  => {
            const checkedTodoId:string = msg.body;
            const updatedTodos = this.state.todos.map(item => item.id === checkedTodoId ? 
                                                              {...item, status: TodoStatus.DONE} : item);
            this.setState({ todos: updatedTodos });
            console.log('A todo was checked');

        })

        this.channel.on('unchecked_todo', ( msg: any)  => {
            const checkedTodoId:string = msg.body;
            const updatedTodos = this.state.todos.map(item => item.id === checkedTodoId ? 
                                                              {...item, status: TodoStatus.TODO} : item);
            this.setState({ todos: updatedTodos });
            console.log('A todo was unchecked');

        })
    }

    render() {
        return (
            <TodoList
                todos={this.state.todos} 
                addTodo={this.addTodo} 
                deleteTodo={this.deleteTodo}
                checkTodo={this.checkTodo}
                uncheckTodo={this.uncheckTodo}
                
                />
        );
    }
}