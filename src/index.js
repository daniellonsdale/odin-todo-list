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