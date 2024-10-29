import "../styles/Projects.css";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseURL } from '../App';









const Projects: React.FC = () => {



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/projects/`);
        console.log(response.data);
        if (Array.isArray(response.data)) {
        } else {
          console.error("API response is not an array:", response.data);
        }
      } catch (error) {
        console.error("Error fetching projects data:", error);
      }
    };
    fetchData();
  }, []);




  return (
    <div className='main_project_containet'>


    </div>
  );
}

export default Projects;
