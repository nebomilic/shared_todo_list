
import { h } from 'preact';
import { Todo, TodoStatus } from '../containers/SharedTodoList';
interface Props {
    deleteTodo: Function,
    checkTodo: Function,
    uncheckTodo: Function,
    todo: Todo
}
export const TodoItem = (props:Props) => {

    const {todo, checkTodo, deleteTodo} = props;
    const checked = todo.status === TodoStatus.DONE ? true : false;

    return <li class="collection-item">
    <label>
        <input type="checkbox" checked={checked}
         onClick={()=> checkTodo(todo.id)}/>
        <span >{todo.text}</span>
    </label>
    <i class="material-icons clear-button" 
        onClick={()=> deleteTodo(todo.id)}>clear</i>
    </li>;
}

    


