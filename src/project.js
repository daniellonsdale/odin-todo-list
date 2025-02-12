import { Todo } from "./todo";

export class Project{
    todos = [];
    constructor(name, index){
        this.name = name;
        this.index = index;
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
}