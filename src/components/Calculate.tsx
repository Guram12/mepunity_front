import "../styles/Calculate.css"
import { ProfileData } from "../App"
import { useEffect, useState } from "react"
import axios from "axios"
import { baseURL } from "../App"
import { div } from "framer-motion/client"

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

const Calculate: React.FC<CalculateProps> = (profileData, isAuthenticated) => {
  const [markedItems, setMarkedItems] = useState<boolean[]>(Array(12).fill(false));
  const [projectServices, setProjectServices] = useState<ProjectServicesType[] | null>([]);
  const [markedServiceCount, setMarkedServiceCount] = useState<number>(0);
  const [square_meter, setSquare_meter] = useState<number | null>(null);
  const [fullPrice, setFullPrice] = useState<number | null>(null);





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
    console.log("fullPrice", fullPrice)

  }, [fullPrice, markedServiceCount])


  const calculate_full_price = () => {
    if (isAuthenticated) {
      if (profileData) {
        const discount = Number(profileData.profileData?.discount)
        let full_price = 0;
        for (let i = 0; i < markedItems.length; i++) {
          if (markedItems[i]) {
            const service = projectServices?.[i];
            if (service && square_meter) {
              full_price += Number(service.price_per_sqm) * square_meter;
            }
          }
        }
        const full_price_with_discount = full_price - Number(full_price * discount / 100)
        setFullPrice(full_price_with_discount)
      }
    }
  }




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
        <h3>ფართობი (m²) </h3>
        <input
          className="square_meter_input"
          placeholder="შეიყვანეთ ფართობი"
          type="number"
          value={square_meter ?? ''}
          onChange={(e) => setSquare_meter(Number(e.target.value))}
          onClick={calculate_full_price}
        />
        <button className="calculate_button"  > <span className="calculate_span" >გამოთვლა</span> </button>
          {fullPrice && (
            <div className="full_price_container">
              <h3>სრული ფასი: {fullPrice} ₾</h3>
            </div>
          )}
      </div>
    </div>
  );
}

export default Calculate;