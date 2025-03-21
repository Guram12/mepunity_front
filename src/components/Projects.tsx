import "../styles/Projects.css";
import "../styles/Loader.css"
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ProjectType } from "../App";
import { useNavigate } from "react-router-dom";
import { scrollToTop } from "../utils/ScrollToTop";
import { motion } from 'framer-motion';
import loader from "../assets/loader.svg"
import axiosInstance from "../utils/axiosInstance";

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/api/projects/`);
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

  const oddAnimation = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 }
  };

  const evenAnimation = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className='main_project_containet'>
      <div className="projects_header_container" >
        <h1 className="completed_h1" >{t("Completed Projects")}</h1>
        <div className="project_header_line" ></div>
        {!project_content_loaded && (
              <img src={loader} alt="custom loader" className="projects_loader"/>
        )}
      </div>

      <div className="projects_parent_container" >
        {projects.map((project, i) => {
          const animation = i % 2 === 0 ? evenAnimation : oddAnimation;
          return (
            <motion.div
              key={i}
              className="project_container"
              onClick={() => handle_project_click(project)}
              initial="hidden"
              animate="visible"
              variants={animation}
              transition={{ duration: 0.5 }}
            >
              <div className="project_image_container" >
                <img src={project?.images[0]?.image} alt="project_image" />
              </div>
              <h2 className="project_title" >{language === "en" ? project.title_en : project.title_ka}</h2>
            </motion.div>
          )
        })}
      </div>
    </div>
  );
}

export default Projects;