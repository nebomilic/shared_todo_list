import { h, Component } from 'preact';
import { Todo } from '../containers/SharedTodoList';
import { TodoItem } from './TodoItem';
import TodoInput from './TodoInput';

interface State {
    text: string
}

interface Props {
    todos: Array<Todo>,
    addTodo: Function,
    deleteTodo: Function,
    checkTodo: Function,
    uncheckTodo: Function
}

export default class TodoList extends Component <Props> {
    state: State = {text: '' };
    setText = (e: any) => 
        this.setState({ text: e.target.value });

    render() {
        const { todos, addTodo, deleteTodo, checkTodo, uncheckTodo } = this.props;
        return (
            <div class="row">
                 <div class="container col s12 offset-m2 m8 offset-l4 l4">
                   <TodoInput addTodo={addTodo} />
                    <ul class="collection">
                        {todos.map((todo) => (
                            <TodoItem 
                                deleteTodo={deleteTodo} 
                                todo={todo} 
                                checkTodo={checkTodo}
                                uncheckTodo={uncheckTodo}
                                />
                        ))}
                    </ul>
                    <footer>checkout on <a href="https://github.com/nebomilic/shared_todo_list">github</a></footer>
                </div>
            </div>
        );
    }
}