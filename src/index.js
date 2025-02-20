import "./styles.css";
import { Project } from "./project";

const newProjectDialog = document.querySelector('.new-project-dialog');
const newTaskDialog = document.querySelector('.new-task-dialog');
const taskDecriptionDialog = document.querySelector('.task-description-dialog');
const taskDecriptionCloseBtn = document.querySelector('.task-decription-modal-close-button');
const taskDecriptionContainer = document.querySelector('.task-description-container');
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

let projects = JSON.parse(localStorage.getItem('projects'))?.map(Project.fromJSON) || [];
let curSelectedProject = 0;
if (projects.length === 0){
    //add default project to array as object
    projects[0] = new Project("Default", 0);
    generateDefaultProjectDOM();
    saveProjectsToLocalStorage();
}else{
    projects.forEach((project) => {
        createProjectDOM(project.name, project.index);
    });
    const indexZeroProject = document.querySelector(`[data-index="0"]`);
    const indexZeroProjectIcon = indexZeroProject.querySelector('.project-icon');
    console.log(indexZeroProject);
    indexZeroProjectIcon.classList.add('cur-selected-project');
    updateDisplayedTodos();
}

function generateDefaultProjectDOM(){
    const defaultProjectDiv = document.createElement('div');
    defaultProjectDiv.classList.add('default-project');
    defaultProjectDiv.classList.add('project-group');
    defaultProjectDiv.dataset.index = 0;

    const projectIconSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    projectIconSVG.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    projectIconSVG.setAttribute('height', '24px');
    projectIconSVG.setAttribute('viewBox', '0 -960 960 960');
    projectIconSVG.setAttribute('width', '24px');
    projectIconSVG.setAttribute('fill', 'currentcolor');
    projectIconSVG.classList.add('project-icon');
    projectIconSVG.classList.add('cur-selected-project');

    const projectIconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    projectIconPath.setAttribute('d', 'M222-200 80-342l56-56 85 85 170-170 56 57-225 226Zm0-320L80-662l56-56 85 85 170-170 56 57-225 226Zm298 240v-80h360v80H520Zm0-320v-80h360v80H520Z');
    projectIconSVG.appendChild(projectIconPath);

    const projectNameSpan = document.createElement('span');
    projectNameSpan.classList.add('project-name-text');
    projectNameSpan.textContent = "Default";

    const projectRemoveButton = document.createElement('button');
    projectRemoveButton.setAttribute('type', 'button');
    projectRemoveButton.classList.add('remove-button');

    const projectRemoveIconSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    projectRemoveIconSVG.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    projectRemoveIconSVG.setAttribute('height', '24px');
    projectRemoveIconSVG.setAttribute('viewBox', '0 -960 960 960');
    projectRemoveIconSVG.setAttribute('width', '24px');
    projectRemoveIconSVG.setAttribute('fill', 'currentcolor');

    const projectRemoveIconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    projectRemoveIconPath.setAttribute('d', 'm256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z');
    projectRemoveIconSVG.appendChild(projectRemoveIconPath);
    projectRemoveButton.appendChild(projectRemoveIconSVG);

    defaultProjectDiv.appendChild(projectIconSVG);
    defaultProjectDiv.appendChild(projectNameSpan);
    defaultProjectDiv.appendChild(projectRemoveButton);
    projectContainer.appendChild(defaultProjectDiv);

}

function createProject(name){
    let newIndex = projects.length;
    projects[newIndex] = new Project(name, projects.length);
    saveProjectsToLocalStorage();
    createProjectDOM(name, newIndex);
}

function createProjectDOM(name, ind){
    const newProjectNode = document.createElement('div');
    newProjectNode.classList.add('project-group');

    const projectIconSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    projectIconSVG.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    projectIconSVG.setAttribute('height', '24px');
    projectIconSVG.setAttribute('viewBox', '0 -960 960 960');
    projectIconSVG.setAttribute('width', '24px');
    projectIconSVG.setAttribute('fill', 'currentcolor');
    projectIconSVG.classList.add('project-icon');

    const projectIconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    projectIconPath.setAttribute('d', 'M222-200 80-342l56-56 85 85 170-170 56 57-225 226Zm0-320L80-662l56-56 85 85 170-170 56 57-225 226Zm298 240v-80h360v80H520Zm0-320v-80h360v80H520Z');
    projectIconSVG.appendChild(projectIconPath);

    const projectNameSpan = document.createElement('span');
    projectNameSpan.classList.add('project-name-text');

    const projectRemoveButton = document.createElement('button');
    projectRemoveButton.setAttribute('type', 'button');
    projectRemoveButton.classList.add('remove-button');

    const projectRemoveIconSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    projectRemoveIconSVG.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    projectRemoveIconSVG.setAttribute('height', '24px');
    projectRemoveIconSVG.setAttribute('viewBox', '0 -960 960 960');
    projectRemoveIconSVG.setAttribute('width', '24px');
    projectRemoveIconSVG.setAttribute('fill', 'currentcolor');

    const projectRemoveIconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    projectRemoveIconPath.setAttribute('d', 'm256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z');
    projectRemoveIconSVG.appendChild(projectRemoveIconPath);
    projectRemoveButton.appendChild(projectRemoveIconSVG);

    newProjectNode.appendChild(projectIconSVG);
    newProjectNode.appendChild(projectNameSpan);
    newProjectNode.appendChild(projectRemoveButton);

    projectNameSpan.textContent = name;
    newProjectNode.dataset.index = ind;

    if(ind > 0){
        let curFinalProjectDataIndex = ind - 1;
        let curFinalProject = document.querySelector(`[data-index="${curFinalProjectDataIndex}"]`);
        curFinalProject.after(newProjectNode);
    }else{
        projectContainer.appendChild(newProjectNode);
    }
}

function removeProject(ind){
    projects.splice(ind, 1);
    projects.forEach(element => {
        if (element.index > ind){
            element.index--;
        }
    });
    removeProjectDOM(ind);
    saveProjectsToLocalStorage();
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
        if(element.completed === true){
            tempTaskCard.classList.add('completed-task');
        }
        switch(element.priority){
            case 5:
                tempTaskCard.classList.add('prio5');
                break;
            case 4:
                tempTaskCard.classList.add('prio4');
                break;
            case 3:
                tempTaskCard.classList.add('prio3');
                break;
            case 2:
                tempTaskCard.classList.add('prio2');
                break;
            case 1:
                tempTaskCard.classList.add('prio1');
                break;
            default:
                break;
        }
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

function saveProjectsToLocalStorage() {
    localStorage.setItem('projects', JSON.stringify(projects));
}

/* window.addEventListener('load', () => {
    let storedProjects = JSON.parse(localStorage.getItem('projects')) || [];
    projects.length = 0;
    projects.push(...storedProjects.map(Project.fromJSON));
}); */

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

taskDecriptionCloseBtn.addEventListener('click', () => {
    taskDecriptionDialog.close();
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
    let taskNameValidity = document.querySelector('#task-name').reportValidity();
    let taskDescriptionValidity = document.querySelector('#task-description').reportValidity();
    let taskDueDateValidity = document.querySelector('#task-due-date').reportValidity();
    let taskPriorityValidity = document.querySelector('#task-priority').reportValidity();

    if(taskNameValidity && taskDescriptionValidity && taskDueDateValidity && taskPriorityValidity){
        e.preventDefault();

        const taskFormData = new FormData(newTaskForm);
        projects[curSelectedProject].createTodo(taskFormData.get('task-name'), taskFormData.get('task-description'), taskFormData.get('task-due-date'), parseInt(taskFormData.get('task-priority')));

        newTaskDialog.close();
        newTaskForm.reset();
        saveProjectsToLocalStorage();
        updateDisplayedTodos();
    }
});

projectContainer.addEventListener('click', (e) => {
    const removeBtn = e.target.closest('.remove-button');
    const projectName = e.target.closest('.project-name-text');
    if(removeBtn && projects.length > 1){
        if(curSelectedProject === parseInt(removeBtn.parentElement.dataset.index) && curSelectedProject === 0){
            curSelectedProject = 1;
            let curProject = document.querySelector(`[data-index="${curSelectedProject}"]`);
            let curProjectIcon = curProject.querySelector('.project-icon');
            curProjectIcon.classList.add('cur-selected-project');
            saveProjectsToLocalStorage();
            updateDisplayedTodos();
            curSelectedProject = 0;
        }else if(curSelectedProject === parseInt(removeBtn.parentElement.dataset.index) && curSelectedProject !== 0){
            curSelectedProject--;
            let curProject = document.querySelector(`[data-index="${curSelectedProject}"]`);
            let curProjectIcon = curProject.querySelector('.project-icon');
            curProjectIcon.classList.add('cur-selected-project');
            saveProjectsToLocalStorage();
            updateDisplayedTodos();
        }
        removeProject(parseInt(removeBtn.parentElement.dataset.index));
    }else if(projectName && parseInt(projectName.parentElement.dataset.index) !== curSelectedProject){
        console.log(parseInt(projectName.parentElement.dataset.index));
        console.log(curSelectedProject);
        let prevProject = document.querySelector(`[data-index="${curSelectedProject}"]`);
        let prevProjectIcon = prevProject.querySelector('.project-icon');
        prevProjectIcon.classList.remove('cur-selected-project');
        curSelectedProject = parseInt(projectName.parentElement.dataset.index);
        let curProject = document.querySelector(`[data-index="${curSelectedProject}"]`);
        let curProjectIcon = curProject.querySelector('.project-icon');
        curProjectIcon.classList.add('cur-selected-project');
        saveProjectsToLocalStorage();
        updateDisplayedTodos();
    }
});

tasksContainer.addEventListener('click', (e) => {
    let completedTask = e.target.closest('.complete-task');
    let removeTask = e.target.closest('.delete-task');
    let tempTaskCard = e.target.closest('.task-card');
    if(completedTask){
        if (completedTask.parentElement.parentElement.classList.contains('completed-task')){
            completedTask.parentElement.parentElement.classList.remove('completed-task');
            projects[curSelectedProject].todos[parseInt(completedTask.parentElement.parentElement.dataset.index)].completed = false;
            saveProjectsToLocalStorage();
        }else{
            completedTask.parentElement.parentElement.classList.add('completed-task');
            projects[curSelectedProject].todos[parseInt(completedTask.parentElement.parentElement.dataset.index)].completed = true;
            saveProjectsToLocalStorage();
        }
    }else if(removeTask){
        console.log(parseInt(removeTask.parentElement.parentElement.dataset.index));
        projects[curSelectedProject].removeTodo(parseInt(removeTask.parentElement.parentElement.dataset.index));
        saveProjectsToLocalStorage();
        updateDisplayedTodos();
    }else{
        taskDecriptionDialog.showModal();
        taskDecriptionContainer.textContent = projects[curSelectedProject].todos[parseInt(tempTaskCard.dataset.index)].description;
    }
});