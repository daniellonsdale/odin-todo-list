import { Todo } from "./todo";

export class Project{
    constructor(name, index, todos = []) {
        this.name = name;
        this.index = index;
        this.todos = todos.map(todo => new Todo(json.title, json.description, json.dueDate, json.priority, json.index, json.completed));
    }

    static fromJSON(json) {
        return new Project(json.name, json.index, json.todos);
    }
    
    createTodo(title, description, dueDate, priority){
        this.todos[this.todos.length] = new Todo(title, description, dueDate, priority, this.todos.length, false);
        //Call createTodoDOM() to add to DOM with data-index
    }

    removeTodo(ind){
        this.todos.splice(ind, 1);
        this.todos.forEach(element => {
            if (element.index > ind){
                element.index--;
            }
        });
        //Call removeTodoDOM to remove from DOM based on data-index
    }

    removeTodoDOM(ind){
        let todotNodeList = document.querySelectorAll('.task-card');
        todotNodeList.forEach(element => {
            if(parseInt(element.dataset.index) === ind){
                element.remove();
            }else if(parseInt(element.dataset.index) > ind){
                let tempIndex = parseInt(element.dataset.index);
                tempIndex--;
                element.dataset.index = tempIndex;
            }
        });
    }
}