import "../styles/Projects.css";
import React, { useEffect, useState } from 'react';
import pdf_image from "../assets/prf_image.png";
import simple_pdf from '../assets/simplepdf_image.png';
import axios from 'axios';
import { baseURL } from '../App';



interface Project_Data_Types {
  imgSrc: string;
  fileSize: string;
  downloadLink: string;
}


const electricityProjectData: Project_Data_Types[] = [
  { imgSrc: pdf_image, fileSize: "144 KB", downloadLink: "/test.pdf" },
  { imgSrc: pdf_image, fileSize: "55 KB", downloadLink: "/test.pdf" },
  { imgSrc: pdf_image, fileSize: "20 MB", downloadLink: "/test.pdf" },
  { imgSrc: pdf_image, fileSize: "46 KB", downloadLink: "/test.pdf" },
  { imgSrc: pdf_image, fileSize: "881 KB", downloadLink: "/test.pdf" },
  { imgSrc: pdf_image, fileSize: "13 KB", downloadLink: "/test.pdf" },
  { imgSrc: pdf_image, fileSize: "77 KB", downloadLink: "/test.pdf" },
];

const fireEmergencyProjectData: Project_Data_Types[] = [
  { imgSrc: simple_pdf, fileSize: "144 KB", downloadLink: "/simple.pdf" },
  { imgSrc: simple_pdf, fileSize: "455 KB", downloadLink: "/simple.pdf" },
  { imgSrc: simple_pdf, fileSize: "20 MB", downloadLink: "/simple.pdf" },
  { imgSrc: simple_pdf, fileSize: "146 KB", downloadLink: "/simple.pdf" },

];



interface New_project_data_Types {
  title: string;
  file: string;
  fileSize: string;
  image: string;
}



const Projects: React.FC = () => {
  const [showDownloadWindow, setShowDownloadWindow] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project_Data_Types | null>(null);
  const [animationClass, setAnimationClass] = useState<string>('');
  const [NewProjects, setNewProjects] = useState<New_project_data_Types[] | null>(null);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/projects/`);
        console.log(response.data);
        if (Array.isArray(response.data)) {
          setNewProjects(response.data);
        } else {
          console.error("API response is not an array:", response.data);
        }
      } catch (error) {
        console.error("Error fetching projects data:", error);
      }
    };
    fetchData();
  }, []);





  const handleDownloadClick = (project: Project_Data_Types) => {
    setSelectedProject(project);
    setAnimationClass('fade-in');
    setShowDownloadWindow(true);
    console.log("clicked");
  };

  const handleCloseClick = () => {
    setAnimationClass('fade-out');
    setTimeout(() => {
      setShowDownloadWindow(false);
      setSelectedProject(null);
    }, 300);
  };

  const handleYesClick = () => {
    setSelectedProject(null)
    setShowDownloadWindow(false)
  }

  return (
    <div className='main_project_containet'>

      {NewProjects && NewProjects.map((project, index) => (
        <div key={index} >
          <p>{project.title}</p>
          <img src={project.image} alt="" />
        </div>
      ))}

      <h1 className='project_header'>ELECTRICITY</h1>
      {showDownloadWindow && selectedProject && (
        <div className={`download_window_container ${animationClass}`}>
          <h1>Download file?</h1>
          <div className='download_window_button'>
            <a href={selectedProject.downloadLink} download className="download-button">
              <button className="window_download" onClick={handleYesClick} >Yes</button>
            </a>
            <button className="window_download" onClick={handleCloseClick}>No</button>
          </div>
        </div>
      )}

      <div className="projects_container">
        {electricityProjectData.map((project, index) => (
          <div key={index} className="projects_child_container">
            <div style={{ overflow: "hidden" }}>
              <img src={project.imgSrc} alt="pdf image" className="pdf_image" />
            </div>
            <div className="button" style={{ marginRight: "40px" }} data-tooltip={`Size: ${project.fileSize}`}>
              <div className="button-wrapper" onClick={() => handleDownloadClick(project)}>
                <div className="text">Download</div>
                <span className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="img"
                    width="2em"
                    height="2em"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h1 className='project_header'>FIRE EMERGENCY SYSTEM</h1>
      {showDownloadWindow && selectedProject && (
        <div className={`download_window_container ${animationClass}`}>
          <h1>Download file?</h1>
          <div className='download_window_button'>
            <a href={selectedProject.downloadLink} download className="download-button">
              <button className="window_download" onClick={handleYesClick} >Yes</button>
            </a>
            <button className="window_download" onClick={handleCloseClick}>No</button>
          </div>
        </div>
      )}

      <div className="projects_container">
        {fireEmergencyProjectData.map((project, index) => (
          <div key={index} className="projects_child_container">
            <div style={{ overflow: "hidden" }}>
              <img src={project.imgSrc} alt="pdf image" className="pdf_image" />
            </div>
            <div className="button" style={{ marginRight: "40px" }} data-tooltip={`Size: ${project.fileSize}`}>
              <div className="button-wrapper" onClick={() => handleDownloadClick(project)}>
                <div className="text">Download</div>
                <span className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="img"
                    width="2em"
                    height="2em"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
