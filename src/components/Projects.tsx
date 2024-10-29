import "../styles/Projects.css";
import "../styles/Loadec.css"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseURL } from '../App';
import SelectedProject from "./SelectedProject";
export interface ProjectType {
  id: number,
  images: { id: number, image: string }[],
  title_ka: string,
  title_en: string,
  description_ka: string,
  description_en: string
}


const Projects: React.FC = () => {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);
  const [isProjectSelected, setIsProjectSelected] = useState<boolean>(false);
  const [project_content_loaded, setProject_content_loaded] = useState<boolean>(false);







  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/projects/`);
        console.log(response.data);
        setProjects(response.data);
        setProject_content_loaded(true);
      } catch (error) {
        console.error("Error fetching projects data:", error);
      }
    };
    fetchData();
  }, []);




  const handle_project_click = (project: ProjectType) => {
    setSelectedProject(project);
    setIsProjectSelected(true);
  }

  useEffect(() => {
    console.log(selectedProject);

  }, [selectedProject]);

  return (
    <div className='main_project_containet'>
      <div className="projects_header_container" >

        <h1>MepUnity Projects</h1>
        <div className="project_header_line" ></div>
        {!project_content_loaded && (
          <div className="dot-spinner" style={{ marginTop: "80px" }} >
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
          </div>
        )}
      </div>

      <div className="projects_parent_container" >
        {projects.map((project, i) => {
          return (
            <div key={i} className="project_container" onClick={() => handle_project_click(project)} >
              <div className="project_image_container" >
                <img src={project.images[0].image} alt="project_image" />
              </div>
              <h2 className="project_title" >{project.title_en}</h2>
            </div>
          )
        })}
      </div>
      {isProjectSelected && (
        <div className="selected_project_component_container">
          <SelectedProject project={selectedProject} />
        </div>
      )}

    </div>
  );
}

export default Projects;
