import { h } from 'preact';
import { Todo } from '../containers/SharedTodoList';
import TodoItem from './TodoItem';
import TodoInput from './TodoInput';

interface Props {
    todos: Array<Todo>,
    addTodo: Function,
    deleteTodo: Function,
    checkTodo: Function,
    uncheckTodo: Function
}

const TodoList = (props:Props) => {
   
    const { todos, addTodo, deleteTodo, checkTodo, uncheckTodo } = props;
    return (
                <div class="row">
                    <div class="container col s12 offset-m2 m8 offset-l4 l4">
                    <TodoInput addTodo={addTodo} />
                        <ul class="collection">
                            {todos.map((todo : Todo) => (
                                <TodoItem 
                                    deleteTodo={deleteTodo} 
                                    todo={todo} 
                                    checkTodo={checkTodo}
                                    uncheckTodo={uncheckTodo}
                                    />
                            ))}
                        </ul>
                        <footer><a href="https://github.com/nebomilic/shared_todo_list">view on github</a></footer>
                    </div>
                </div>
    );
}

export default TodoList;
