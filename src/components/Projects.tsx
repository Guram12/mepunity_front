import "../styles/Projects.css";
import "../styles/Loader.css"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseURL } from '../App';
import { useTranslation } from 'react-i18next';
import { ProjectType } from "../App";
import { useNavigate } from "react-router-dom";
import { scrollToTop } from "../utils/ScrollToTop";

interface ProjectsProps {
  language: string
}

const Projects: React.FC<ProjectsProps> = ({ language }) => {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [project_content_loaded, setProject_content_loaded] = useState<boolean>(false);

  const navigate = useNavigate();
  const { t } = useTranslation();




  useEffect(() => {
    scrollToTop();
  }, []);

  // =========================================================================================
  useEffect(() => {
    console.log("Base URL:", baseURL);
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
    navigate(`/projects/${project.id}`);
  }


  return (
    <div className='main_project_containet'>
      <div className="projects_header_container" >

        <h1>{t("Completed Projects")}</h1>
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
                <img src={project?.images[0]?.image} alt="project_image" />
              </div>
              <h2 className="project_title" >{language === "en" ? project.title_en : project.title_ka}</h2>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default Projects;