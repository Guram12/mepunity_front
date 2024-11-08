import "../styles/SelectedProject.css"
import { ProjectType } from "../App";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../App";


const SelectedProject: React.FC = () => {

  const [project, setProject] = useState<ProjectType | null>(null);
  const { projectId } = useParams<{ projectId: string }>();



  useEffect(() => {
    const fetchSelectedProject = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/projects/${projectId}`);
        setProject(response.data);
      } catch (error) {
        console.error("Error fetching selected project data:", error);
      }
    }
    fetchSelectedProject();
  }, [projectId]);



  useEffect(() => {
    console.log("project id", projectId);
    console.log("project", project);

  }, [project, projectId]);

  return (
    <div>
      selected project component
    </div>
  )
}


export default SelectedProject;




