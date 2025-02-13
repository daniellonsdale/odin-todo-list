export class Todo{
    constructor(title, description, dueDate, priority, index, completed){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.dueDateObject = new Date(dueDate);
        this.priority = priority;
        this.index = index;
        this.completed = completed;
    }
}