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
const newProjectSubmitBtn = document.querySelector('.new-project-submit-button');
const newTaskSubmitBtn = document.querySelector('.new-task-submit-button');
const defaultProject = document.querySelector('.default-project');

let projects = [];
let curSelectedProject = 0;

function createProject(name){
    projects[projects.length] = new Project(name, projects.length);
    createProjectDOM(name, projects.length);
}

function createProjectDOM(name, ind){
    let newProjectNode = defaultProject.cloneNode(true);
    newProjectNode.classList.remove('default-project');
    let projectNameText = newProjectNode.querySelector('.project-name-text');
    projectNameText.textContent = name;
    newProjectNode.dataset.index = ind;
    let curFinalProjectDataIndex = projects.length - 1;
    console.log(curFinalProjectDataIndex);
    let curFinalProject = document.querySelector(`[data-index="${curFinalProjectDataIndex}"]`);
    curFinalProject.after(newProjectNode);
}

function removeProject(ind){
    projects.splice(ind, 1);
    projects.forEach(element => {
        if (element.index > ind){
            element.index--;
        }
    });
    removeProjectDOM(ind);
}

function removeProjectDOM(ind){
    let projectNodeList = document.querySelectorAll('.project-group');
    projectNodeList.forEach(element => {
        if(parseInt(element.dataset.index) === ind){
            element.remove();
        }else if(element.dataset.index > ind){
            let tempIndex = parseInt(element.dataset.index);
            tempIndex--;
            element.dataset.index = tempIndex;
        }
    });
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

newProjectSubmitBtn.addEventListener('click', (e) => {
    let projectNameValidity = document.querySelector('#project-name').reportValidity();
    if(projectNameValidity){
        e.preventDefault();

        const projectFormData = new FormData(newProjectForm);
        createProject(projectFormData.get('project-name'));

        newProjectDialog.close();
        newProjectForm.reset();
    }
});

newTaskSubmitBtn.addEventListener('click', (e) => {
    let taskNameValidity = document.querySelector('#task-name');
    let taskDescriptionValidity = document.querySelector('#task-description');
    let taskDueDateValidity = document.querySelector('#task-due-date');
    let taskPriorityValidity = document.querySelector('#task-priority');

    if(taskNameValidity && taskDescriptionValidity && taskDueDateValidity && taskPriorityValidity){
        e.preventDefault();

        const taskFormData = new FormData(newTaskForm);
        projects[curSelectedProject].createTodo(taskFormData.get('task-name'), taskFormData.get('task-description'), taskFormData.get('task-due-date'), taskFormData.get('task-priority'));

        newTaskDialog.close();
        newTaskForm.reset();
    }
});

createProject("testpro");
console.log(projects);
projects[0].createTodo("laundry", "do the laundry and hang it up after", "2025/2/4", 3);
projects[0].createTodo("cook", "do the cooking and eat it", "2025/2/1", 1);
projects[0].removeTodo(0);
console.log(projects[0]);
console.log(projects[1]);