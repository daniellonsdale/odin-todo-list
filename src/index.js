import "./styles.css";
import { Project } from "./project";

const newProjectDialog = document.querySelector('.new-project-dialog');
const newTaskDialog = document.querySelector('.new-task-dialog');
const addNewProjectBtn = document.querySelector('.add-new-project');
const addNewTaskBtn = document.querySelector('.add-new-task');
const projectModalCloseBtn = document.querySelector('.project-modal-close-button');
const taskModalCloseBtn = document.querySelector('.task-modal-close-button');
const newProjectForm = document.querySelector('.new-project-form');
const newTaskForm = document.querySelector('.new-task-form');

let projects = [];

function createProject(name){
    projects[projects.length] = new Project(name, projects.length);
    //Call createProjectDOM to add to DOM with data-index
}

function removeProject(ind){
    projects.splice(ind, 1);
    projects.forEach(element => {
        if (element.index > ind){
            element.index--;
        }
    });
    //Call removeProjectDOM to remove from DOM based on data-index
}

addNewProjectBtn.addEventListener('click', () => {
    newProjectDialog.showModal();
});

addNewTaskBtn.addEventListener('click', () => {
    newTaskDialog.showModal();
});

projectModalCloseBtn.addEventListener('click', () => {
    newProjectDialog.close();
    newProjectForm.reset();
});

taskModalCloseBtn.addEventListener('click', () => {
    newTaskDialog.close();
    newTaskForm.reset();
});

createProject("testpro");
console.log(projects);
projects[0].createTodo("laundry", "do the laundry and hang it up after", "2025/2/4", 3);
projects[0].createTodo("cook", "do the cooking and eat it", "2025/2/1", 1);
projects[0].removeTodo(0);
console.log(projects[0]);
console.log(projects[1]);