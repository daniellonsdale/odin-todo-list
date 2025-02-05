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
const projectContainer = document.querySelector('.project-container');
const tasksContainer = document.querySelector('.tasks-container');

let projects = [];
let curSelectedProject = 0;

//add default project to array as object
projects[0] = new Project("default", 0);

function createProject(name){
    let newIndex = projects.length;
    projects[newIndex] = new Project(name, projects.length);
    createProjectDOM(name, newIndex);
}

function createProjectDOM(name, ind){
    let newProjectNode = defaultProject.cloneNode(true);
    newProjectNode.classList.remove('default-project');
    let projectNameText = newProjectNode.querySelector('.project-name-text');
    projectNameText.textContent = name;
    newProjectNode.dataset.index = ind;
    let curFinalProjectDataIndex = ind - 1;
    console.log(curFinalProjectDataIndex);
    let curFinalProject = document.querySelector(`[data-index="${curFinalProjectDataIndex}"]`);
    curFinalProject.after(newProjectNode);
}

function removeProject(ind){
    //There must be at least one project
    if (projects.length === 1){
        return;
    }
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
        }else if(parseInt(element.dataset.index) > ind){
            let tempIndex = parseInt(element.dataset.index);
            tempIndex--;
            element.dataset.index = tempIndex;
        }
    });
}

function updateDisplayedTodos(){
    tasksContainer.replaceChildren();

    projects[curSelectedProject].todos.forEach((element) => {
        const tempTaskCard = document.createElement('div');
        tempTaskCard.classList.add('task-card');
        tempTaskCard.dataset.index = element.index;

        const tempTaskCardLeftContainer = document.createElement('div');
        tempTaskCardLeftContainer.classList.add('task-card-left-container');
        const tempTaskCardTaskName = document.createElement('div');
        tempTaskCardTaskName.classList.add('task-name');
        tempTaskCardTaskName.textContent = element.title;
        tempTaskCardLeftContainer.appendChild(tempTaskCardTaskName);
        const tempTaskCardTaskDate = document.createElement('div');
        tempTaskCardTaskDate.classList.add('task-date');
        tempTaskCardTaskDate.textContent = element.dueDate;
        tempTaskCardLeftContainer.appendChild(tempTaskCardTaskDate);
        tempTaskCard.appendChild(tempTaskCardLeftContainer);

        const tempTaskCardRightContainer = document.createElement('div');
        tempTaskCardRightContainer.classList.add('task-card-right-container');

        const tempTaskCardCompleteContainer = document.createElement('button');
        tempTaskCardCompleteContainer.classList.add('complete-task');
        const completeTaskSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        completeTaskSVG.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        completeTaskSVG.setAttribute('height', '24px');
        completeTaskSVG.setAttribute('viewBox', '0 -960 960 960');
        completeTaskSVG.setAttribute('width', '24px');
        completeTaskSVG.setAttribute('fill', 'currentcolor');
        const completeTaskPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        completeTaskPath.setAttribute('d', 'M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z');
        completeTaskSVG.appendChild(completeTaskPath);
        tempTaskCardCompleteContainer.appendChild(completeTaskSVG);
        tempTaskCardRightContainer.appendChild(tempTaskCardCompleteContainer);

        const tempTaskCardDeleteContainer = document.createElement('button');
        tempTaskCardDeleteContainer.classList.add('delete-task');
        const deleteTaskSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        deleteTaskSVG.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        deleteTaskSVG.setAttribute('height', '24px');
        deleteTaskSVG.setAttribute('viewBox', '0 -960 960 960');
        deleteTaskSVG.setAttribute('width', '24px');
        deleteTaskSVG.setAttribute('fill', 'currentcolor');
        const deleteTaskPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        deleteTaskPath.setAttribute('d', 'M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z');
        deleteTaskSVG.appendChild(deleteTaskPath);
        tempTaskCardDeleteContainer.appendChild(deleteTaskSVG);
        tempTaskCardRightContainer.appendChild(tempTaskCardDeleteContainer);
        tempTaskCard.appendChild(tempTaskCardRightContainer);
        tasksContainer.appendChild(tempTaskCard);
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
        updateDisplayedTodos();
    }
});

projectContainer.addEventListener('click', (e) => {
    const removeBtn = e.target.closest('.remove-button');
    if(removeBtn){
        removeProject(parseInt(removeBtn.parentElement.dataset.index));
    }
    //Add conditionals for switching to projects, maybe a confirmation modal
});