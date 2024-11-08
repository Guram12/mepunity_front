import React, { useState } from 'react';
import { FaAnglesLeft, FaAnglesRight, FaExpand } from "react-icons/fa6";
import { IoMdCloseCircle } from "react-icons/io";
import { ProjectType } from '../App';


interface SelectedProjectProps {
  language: string;
  project: ProjectType | null;
  setIsProjectSelected: (isProjectSelected: boolean) => void;
}

const Selected: React.FC<SelectedProjectProps> = ({ project, setIsProjectSelected , language}) => {
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
        <h2>{language === "en" ? project.title_en : project.title_ka}</h2>
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
          <p className='project_description' >{language === "en" ? project.description_en : project.description_ka}</p>
        </div>
      </div>
    </div>
  );
};

export default Selected;