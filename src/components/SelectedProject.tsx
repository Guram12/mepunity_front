import React, { useState } from 'react';
import "../styles/SelectedProject.css";
import { ProjectType } from "./Projects";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";

interface SelectedProjectProps {
  project: ProjectType | null;
}

const SelectedProject: React.FC<SelectedProjectProps> = ({ project }) => {
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

  return (
    <div className="selected_project_container">
      <h2>{project.title_en}</h2>
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
          <p>{project.description_en}</p>
        </div>
      </div>
    </div>
  );
};

export default SelectedProject;