export class Todo{
    constructor(title, description, dueDate, priority, index, completed){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.index = index;
        this.completed = completed;
    }

    static fromJSON(json) {
        return new Todo(json.title, json.description, json.dueDate, json.priority, json.index, json.completed);
    }
}