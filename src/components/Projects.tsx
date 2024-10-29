import "../styles/Projects.css";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseURL } from '../App';


interface ProjectType {
  id: number,
  images: { id: number, image: string }[],
  title_ka: string,
  title_en: string,
  description_ka: string,
  description_en: string
}


const Projects: React.FC = () => {
  const [projects, setProjects] = useState<ProjectType[]>([]);




  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/projects/`);
        console.log(response.data);
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects data:", error);
      }
    };
    fetchData();
  }, []);




  return (
    <div className='main_project_containet'>
      <div className="projects_header_container" >
        <h1>MepUnity Projects</h1>
        <div className="project_header_line" ></div>
      </div>

      <div className="projects_parent_container" >
        {projects.map((project, i) => {
          return (
            <div key={i} className="project_container" >
              <div className="project_image_container" >
                <img src={project.images[0].image} alt="project_image" />
              </div>
              <h2 className="project_title" >{project.title_en}</h2>

            </div>
          )
        })}
      </div>


    </div>
  );
}

export default Projects;
