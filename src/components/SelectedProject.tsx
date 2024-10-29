import "../styles/SelectedProject.css"
import { ProjectType } from "./Projects"


interface SelectedProjectProps {
  project: ProjectType | null
}

const SelectedProject: React.FC<SelectedProjectProps> = ({ project }) => {
  if (!project) return null;

  return (
    <div className="selected_project_container">
      <h2>{project.title_en}</h2>
      <div className="slider_and_description_container" >

        <div className="slider_container" >
          <img src={project.images[0].image} alt="project_image" style={{ width: "200px" }} />
        </div>

        <div className="description_container" >
          <p>{project.description_en}</p>
        </div>

      </div>
    </div>
  );
}


export default SelectedProject;










