import "../styles/Calculate.css"
import "../styles/Loadec.css"
import { ProfileData } from "../App"
import { useEffect, useState } from "react"
import axios from "axios"
import { baseURL } from "../App"

interface CalculateProps {
  profileData: ProfileData | null,
  isAuthenticated: boolean,
}

interface ProjectServicesType {
  id: number,
  dtype: "electrical" | "mechanical" | "plumbing",
  name_ka: string,
  name_en: string,
  discount_percentage: string,
  price_per_sqm_below: string,
  price_per_sqm_above: string,
}

const Calculate: React.FC<CalculateProps> = ({ profileData, isAuthenticated }) => {
  const [markedItems, setMarkedItems] = useState<Set<number>>(new Set());
  const [projectServices, setProjectServices] = useState<ProjectServicesType[]>([]);
  const [markedServiceCount, setMarkedServiceCount] = useState<number>(0);
  const [square_meter, setSquare_meter] = useState<number | null>(null);
  const [fullPrice, setFullPrice] = useState<number | null>(null);
  const [warning, setWarning] = useState<string>('');
  const [contentLoaded, setContentLoaded] = useState<boolean>(false);
  const [minimum_space_for_newprice, setMinimum_space_for_newprice] = useState<number>(0);




  // ===================================   fetch minimum space for new price =========================================

  useEffect(() => {
    const fetchMinimumSpace = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/minimum-space`);
        if (response.data) {
          // console.log("response.data.space", response.data[0].space)
          setMinimum_space_for_newprice(response.data[0].space);
        } else {
          console.error("API response is not an array:", response.data);
        }
      } catch (error) {
        console.error("Error fetching minimum space data:", error);
      }
    };

    fetchMinimumSpace();
  }, []);


  // ========================================== fetch service prices ==========================================
  useEffect(() => {
    const fetchProjectPrices = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/project-services/`);
        if (Array.isArray(response.data)) {
          setProjectServices(response.data);
          setContentLoaded(true);
        } else {
          console.error("API response is not an array:", response.data);
        }
      } catch (error) {
        console.error("Error fetching project services data:", error);
      }
    };

    fetchProjectPrices();
  }, []);
  // =============================================================================================================

  const handleItemClick = (id: number) => {
    setMarkedItems(prevState => {
      const newState = new Set(prevState);
      if (newState.has(id)) {
        newState.delete(id);
      } else {
        newState.add(id);
      }
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
    setMarkedServiceCount(markedItems.size);
  }, [markedItems]);

  // ===============================================================================================================

  useEffect(() => {
    console.log("markedServiceCount", markedServiceCount)
    console.log("fullPrice", fullPrice)
  }, [fullPrice, markedServiceCount])

  useEffect(() => {
    calculate_full_price();
  }, [markedItems, square_meter]);



  const calculate_full_price = () => {
    console.log("isAuthenticated from clc", isAuthenticated);
    if (markedItems.size === 0) {
      setWarning('აირჩიეთ სერვისი');
      return;
    }
    let full_price = 0;

    markedItems.forEach(id => {
      const service = projectServices?.find(service => service.id === id);
      if (service && square_meter) {
        setWarning('');
        console.log(
          `Service: ${service.name_ka}, 
          price_per_sqm_below: ${service.price_per_sqm_below}, 
          , price_per_sqm_above: ${service.price_per_sqm_above},
          Square meter: ${square_meter}`
        );


        let price_per_sqm = Number(square_meter) > minimum_space_for_newprice ? Number(service.price_per_sqm_above) : Number(service.price_per_sqm_below);
        if (!isAuthenticated && markedItems.size > 1) {
          const discount = Number(service.discount_percentage);
          price_per_sqm -= (price_per_sqm * discount / 100);
        }
        full_price += price_per_sqm * square_meter;
      }
    });

    if (isAuthenticated && profileData) {
      const discount = Number(profileData?.discount);
      console.log(`Total price before discount: ${full_price}`);
      const full_price_with_discount = full_price - (full_price * discount / 100);
      console.log(`Total price after discount: ${full_price_with_discount}`);
      setFullPrice(full_price_with_discount);
    } else {
      console.log(`Total price: ${full_price}`);
      setFullPrice(full_price);
    }
  };


  const clear_all = () => {
    setMarkedItems(new Set());
    setSquare_meter(null);
    setFullPrice(null);
    setWarning('');
  }

  return (
    <div className="main_calculation_container">
      <div className="parent_div_line">
        <h2 className="select_service_h2" >აირჩიეთ სასურველი სერვისი</h2>
        <div className="child_div_line"></div>
      </div>
      {warning && (
        <div className="warning_container">
          <h3>{warning}</h3>
        </div>
      )}
      <div className="services_container" >

        <h3 className="service_name" >ელექტროობა</h3>
        {!contentLoaded && (
          <div className="dot-spinner">
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
          </div>
        )}
        <div className="first_project_group_container">
          {electricalServices.map((service) => (
            <p
              key={service.id}
              className={`project_checkmark ${markedItems.has(service.id) ? 'marked' : 'unmarked'}`}
              onClick={() => handleItemClick(service.id)}
            >
              {service.name_ka}
            </p>
          ))}
        </div>

        <h3>მექანიკური</h3>
        {!contentLoaded && (
          <div className="dot-spinner">
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
          </div>
        )}
        <div className="first_project_group_container">
          {mechanicalServices.map((service) => (
            <p
              key={service.id}
              className={`project_checkmark ${markedItems.has(service.id) ? 'marked' : 'unmarked'}`}
              onClick={() => handleItemClick(service.id)}
            >
              {service.name_ka}
            </p>
          ))}
        </div>

        <h3>სანტექნიკა</h3>
        {!contentLoaded && (
          <div className="dot-spinner">
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
          </div>
        )}
        <div className="first_project_group_container">
          {plumbingServices.map((service) => (
            <p
              key={service.id}
              className={`project_checkmark ${markedItems.has(service.id) ? 'marked' : 'unmarked'}`}
              onClick={() => handleItemClick(service.id)}
            >
              {service.name_ka}
            </p>
          ))}
        </div>

        <div className="calculation_container">
          <h3>ფართობი (m²) </h3>

          <div className="mobile_input_container" >
            <input
              className="square_meter_input"
              placeholder="შეიყვანეთ ფართობი"
              type="number"
              value={square_meter !== null ? square_meter : ''}
              onChange={(e) => {
                const value = e.target.value;
                setSquare_meter(value === '' ? null : Number(value));
              }}
            />
          </div>

          <button className="calculate_button clear" onClick={clear_all}>
            <span className="calculate_span">გასუფთავება</span>
          </button>
        </div>

        {fullPrice !== null && fullPrice > 0 && (
          <div className="full_price_container">
            <h3>სრული ფასი: {Number(fullPrice.toFixed(2))} ₾</h3>
          </div>
        )}
      </div>


    </div>
  );
}

export default Calculate;