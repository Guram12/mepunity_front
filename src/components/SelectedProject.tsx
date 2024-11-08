import "../styles/SelectedProject.css";
import "../styles/Loader.css"
import { ProjectType } from "../App";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../App";
import { FaAnglesLeft, FaAnglesRight, FaExpand } from "react-icons/fa6";
import { useTranslation } from "react-i18next";




interface SelectedProjectProps {
  language: string;
}

const SelectedProject: React.FC<SelectedProjectProps> = ({ language }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [project, setProject] = useState<ProjectType | null>(null);

  const { projectId } = useParams<{ projectId: string }>();
  const { t } = useTranslation();



  useEffect(() => {
    const fetchSelectedProject = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/projects/${projectId}`);
        setProject(response.data);
      } catch (error) {
        console.error("Error fetching selected project data:", error);
      }
    };
    fetchSelectedProject();
  }, [projectId]);

  useEffect(() => {
    console.log("project id", projectId);
    console.log("project", project);
  }, [project, projectId]);

  const handleNextImage = () => {
    if (!project) return;
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % project.images.length);
    console.log("next image");
  };

  const handlePrevImage = () => {
    if (!project) return;
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + project.images.length) % project.images.length);
    console.log("prev image");
  };

  const handleFullscreen = () => {
    const elem = document.querySelector('.slider_container');
    if (elem) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
        setIsFullScreen(false);
      } else {
        elem.requestFullscreen();
        setIsFullScreen(true);
      }
    }
  }



  
  if (!project) {
    return (
      <div className="loader_on_selected_project">
        <div className="dot-spinner" >
          <div className="dot-spinner__dot"></div>
          <div className="dot-spinner__dot"></div>
          <div className="dot-spinner__dot"></div>
          <div className="dot-spinner__dot"></div>
          <div className="dot-spinner__dot"></div>
          <div className="dot-spinner__dot"></div>
          <div className="dot-spinner__dot"></div>
          <div className="dot-spinner__dot"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="selected_project_main_container">
      <h1 className="sel_pr_h1" >{language === "en" ? project?.title_en : project?.title_ka}</h1>
      <div className="selected_project_child_cont">
        {!isFullScreen && (
          <FaAnglesLeft className="slider_button_left" onClick={handlePrevImage} />
        )}
        <div className="slider_container">
          {isFullScreen && (
            <FaAnglesLeft className="onfullscreen_slider_button_left" onClick={handlePrevImage} />
          )}
          <div className="image_wrapper" style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}>
            {project?.images?.map((image, index) => (
              <img
                key={image.id}
                src={image.image}
                alt={`project_image_${index}`}
                className={`main_slider_image ${index === currentImageIndex ? "active" : ""}`}
              />
            ))}
          </div>
          <FaExpand className='fullscreen_button' onClick={handleFullscreen} />
          {isFullScreen && (
            <FaAnglesRight className="onfullscreen_slider_button_right" onClick={handleNextImage} />
          )}
          {/* dot container  */}
          <div className="dots_container">
            {project?.images?.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === currentImageIndex ? 'active' : ''}`}
                onClick={() => setCurrentImageIndex(index)}
              ></span>
            ))}
          </div>
        </div>
        {!isFullScreen && (
          <FaAnglesRight className="slider_button_right" onClick={handleNextImage} />
        )}
      </div>

      <h1 className="descr_header_sel_pr" >{t("Description")}</h1>

      <div className="selectedproject_description_continer">
        <p className="description_selectedproject" >{language === "en" ? project?.description_en : project?.description_ka}</p>
      </div>
    </div>
  );
};

export default SelectedProject;