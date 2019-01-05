
import { h } from 'preact';
interface Props {
    addTodo: Function
}
const TodoInput = (props:Props) => {
    
    let textInput : any;

    const addTodo = (value : string) => {
        if (value && value.length > 0) {
                    props.addTodo(value);
                    resetValue(textInput);
        }
    }

    const resetValue = (element:any) => {
        element.value = "";
    }

    const keyPressHandler = (e: KeyboardEvent) => {
        if (e.keyCode === 13) {
            addTodo(textInput.value)
        }
    }

    return(  
        <div class="add-todo-container">
            <input id="todoInput" 
                ref={input => textInput = input}
                onKeyPress={keyPressHandler}
                placeholder="What do you want to do?" />
                <button class="waves-effect waves-light btn" 
                onClick={()=> this.addTodo(textInput.value)}>
                    Add
                </button>
        </div>
    );
}

export default TodoInput;

    


