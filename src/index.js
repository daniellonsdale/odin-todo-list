import "./styles.css";
import { Project } from "./project";

let projects = [];

function createProject(name){
    projects[projects.length] = new Project(name, projects.length);
    //Call createProjectDOM to add to DOM with data-index
}