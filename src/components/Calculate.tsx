import "../styles/Calculate.css"
import { ProfileData } from "../App"
import { useEffect, useState } from "react"
import axios from "axios"
import { baseURL } from "../App"

interface CalculateProps {
  profileData: ProfileData | null,
  isAuthenticated: boolean,
}

interface ProjectServicesType {
  dtype: "electrical" | "mechanical" | "plumbing",
  name_ka: string,
  name_en: string,
  discount_percentage: string,
  price_per_sqm: string
}

const Calculate: React.FC<CalculateProps> = (isAuthenticated) => {
  const [markedItems, setMarkedItems] = useState<boolean[]>(Array(12).fill(false));
  const [projectServices, setProjectServices] = useState<ProjectServicesType[] | null>([]);
  const [markedServiceCount, setMarkedServiceCount] = useState<number>(0);



  // ========================================== fetch service prices ==========================================
  useEffect(() => {
    const fetchProjectPrices = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/project-services/`)
        console.log(response.data)
        setProjectServices(response.data)
      } catch (error) {
        console.log("Cannot fetch project services.", error)
      }
    }

    fetchProjectPrices();
  }, [])

  // =============================================================================================================

  const handleItemClick = (index: number) => {
    setMarkedItems(prevState => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };


  // ===================================    filtering by dtype   ===================================================

  const filterServicesByType = (type: "electrical" | "mechanical" | "plumbing") => {
    return projectServices?.filter(service => service.dtype === type) || [];
  };

  const electricalServices = filterServicesByType("electrical");
  const mechanicalServices = filterServicesByType("mechanical");
  const plumbingServices = filterServicesByType("plumbing");
  
  // ===============================================================================================================
  // ============================== count  marked service number ===================================================

  useEffect(() => {
    const countMarkedServices = () => {
      return markedItems.filter(item => item).length;
    };
    setMarkedServiceCount(countMarkedServices());
  }, [markedItems]);

  // ===============================================================================================================



  useEffect(() => {
    console.log("markedServiceCount", markedServiceCount)
  }, [markedServiceCount])







  return (
    <div className="main_calculation_container">
      <div className="parent_div_line">
        <h2>აირჩიეთ სასურველი სერვისი</h2>
        <div className="child_div_line"></div>
      </div>

      <h3>ელექტროობა</h3>
      <div className="first_project_group_container">
        {electricalServices.map((service, index) => (
          <p
            key={index}
            className={`project_checkmark ${markedItems[index] ? 'marked' : 'unmarked'}`}
            onClick={() => handleItemClick(index)}
          >
            {service.name_ka}
          </p>
        ))}
      </div>

      <h3>მექანიკური</h3>
      <div className="first_project_group_container">
        {mechanicalServices.map((service, index) => (
          <p
            key={index + electricalServices.length}
            className={`project_checkmark ${markedItems[index + electricalServices.length] ? 'marked' : 'unmarked'}`}
            onClick={() => handleItemClick(index + electricalServices.length)}
          >
            {service.name_ka}
          </p>
        ))}
      </div>

      <h3>სანტექნიკა</h3>
      <div className="first_project_group_container">
        {plumbingServices.map((service, index) => (
          <p
            key={index + electricalServices.length + mechanicalServices.length}
            className={`project_checkmark ${markedItems[index + electricalServices.length + mechanicalServices.length] ? 'marked' : 'unmarked'}`}
            onClick={() => handleItemClick(index + electricalServices.length + mechanicalServices.length)}
          >
            {service.name_ka}
          </p>
        ))}
      </div>

      <div className="calculation_container">
        <input type="text" />
        <button>გამოთვლა</button>
      </div>
    </div>
  );
}

export default Calculate;