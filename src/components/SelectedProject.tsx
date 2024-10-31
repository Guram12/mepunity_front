import React, { useState } from 'react';
import "../styles/SelectedProject.css";
import { ProjectType } from "./Projects";
import { FaAnglesLeft, FaAnglesRight, FaExpand } from "react-icons/fa6";
import { IoMdCloseCircle } from "react-icons/io";

interface SelectedProjectProps {
  project: ProjectType | null;
  setIsProjectSelected: (isProjectSelected: boolean) => void;
}

const SelectedProject: React.FC<SelectedProjectProps> = ({ project, setIsProjectSelected }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!project) return null;

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % project.images.length);
    console.log('next image');
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + project.images.length) % project.images.length);
    console.log('prev image');
  };

  const handleClose = () => {
    setIsProjectSelected(false);
  }

  const handleFullscreen = () => {
    const elem = document.querySelector('.slider_container');
    if (elem) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        elem.requestFullscreen();
      }
    }
  }

  return (
    <div className="selected_project_container">
      <div className='project_header_and_close_container' >
        <h2>{project.title_en}</h2>
        <IoMdCloseCircle className='project_close' onClick={handleClose} />
      </div>
      <div className="slider_and_description_container">
        <div className="slider_container">
          <FaAnglesLeft className='slider_button_left' onClick={handlePrevImage} />
          <div className="image_wrapper">
            {project.images.map((image, index) => (
              <img
                key={image.id}
                src={image.image}
                alt={`project_image_${index}`}
                className={`main_slider_image ${index === currentImageIndex ? 'active' : ''}`}
              />
            ))}
          </div>
          <FaAnglesRight className='slider_button_right' onClick={handleNextImage} />
          <FaExpand className='fullscreen_button' onClick={handleFullscreen} />
          <div className="dots_container">
            {project.images.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === currentImageIndex ? 'active' : ''}`}
                onClick={() => setCurrentImageIndex(index)}
              ></span>
            ))}
          </div>
        </div>
        <div className="description_container">
          <p className='project_description' >{project.description_en}</p>
        </div>
      </div>
    </div>
  );
};

export default SelectedProject;