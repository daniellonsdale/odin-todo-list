import "./styles.css";
import { Project } from "./project";

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

createProject("testpro");
console.log(projects);
projects[0].createTodo("laundry", "do the laundry and hang it up after", "2025/2/4", 3);
projects[0].createTodo("cook", "do the cooking and eat it", "2025/2/1", 1);
projects[0].removeTodo(0);
console.log(projects[0]);
console.log(projects[1]);