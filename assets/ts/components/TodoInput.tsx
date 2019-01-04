
import { h, Component} from 'preact';
interface Props {
    addTodo: Function
}
export default class TodoInput extends Component <Props> {
    
    private input : any;


    addTodo = (value : string) => {
        if (value && value.length > 0) {
                    this.props.addTodo(value);
                    this.resetValue(this.input);
        }
    }

    resetValue = (element:any) => {
        element.value = "";
    }

    keyPressHandler = (e: KeyboardEvent) => {
        if (e.keyCode === 13) {
            this.addTodo(this.input.value)
        }
    }

    render() {
        return(  
            <div class="add-todo-container">
                <input id="todoInput" 
                    ref={input => this.input = input}
                    onKeyPress={this.keyPressHandler}
                    placeholder="What do you want to do?" />
                    <button class="waves-effect waves-light btn" 
                    onClick={()=> this.addTodo(this.input.value)}
                    >Add</button>
            </div>
        );
    }
}

    


