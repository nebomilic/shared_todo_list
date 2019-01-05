
import { h } from 'preact';
import { Todo, TodoStatus } from '../containers/SharedTodoList';
interface Props {
    deleteTodo: Function,
    checkTodo: Function,
    uncheckTodo: Function,
    todo: Todo
}
const TodoItem = (props:Props) => {

    let checkbox: any;

    const {todo, checkTodo, uncheckTodo, deleteTodo} = props;
    const checked = todo.status === TodoStatus.DONE ? true : false;
    const toggle = (id : string, checked : boolean) => checked ? checkTodo(id) : uncheckTodo(id);

    return (
                <li class="collection-item">
                    <label>
                        <input type="checkbox" checked={checked}
                        ref={input => checkbox = input}
                        onClick={()=> toggle(todo.id, checkbox.checked)}/>
                        <span >{todo.text}</span>
                    </label>
                    <i class="material-icons clear-button float-right" 
                        onClick={()=> deleteTodo(todo.id)}>clear</i>
                </li>
    );
}

export default TodoItem;

    


