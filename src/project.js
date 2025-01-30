import { Todo } from "./todo";

export class Project{
    constructor(name){
        todos = [];
        this.name = name;
    }

    createTodo(title, description, dueDate, priority){
        todos[todos.length] = new Todo(title, description, dueDate, priority, todos.length);
        //Call createTodoDOM() to add to DOM with data-index
    }

    removeTodo(index){
        delete todos[index];
        //Call removeTodoDOM to remove from DOM based on data-index
    }
}