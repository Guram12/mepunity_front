import "../styles/Calculate.css"
import "../styles/Loader.css"
import { ProfileData } from "../App"
import { useEffect, useState } from "react"
import axiosInstance from "../utils/axiosInstance"
import { useTranslation } from 'react-i18next';
import { scrollToTop } from "../utils/ScrollToTop"
import { motion } from 'framer-motion';

interface CalculateProps {
  language: string,
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

const Calculate: React.FC<CalculateProps> = ({ profileData, isAuthenticated, language }) => {
  const [markedItems, setMarkedItems] = useState<Set<number>>(new Set());
  const [projectServices, setProjectServices] = useState<ProjectServicesType[]>([]);
  // const [markedServiceCount, setMarkedServiceCount] = useState<number>(0);
  const [square_meter, setSquare_meter] = useState<number | null>(null);
  const [fullPrice, setFullPrice] = useState<number | null>(null);
  const [warning, setWarning] = useState<string>('');
  const [contentLoaded, setContentLoaded] = useState<boolean>(false);
  const [minimum_space_for_newprice, setMinimum_space_for_newprice] = useState<number>(0);

  const { t } = useTranslation();


  useEffect(() => {
    scrollToTop();
  }, [])

  // ===================================   fetch minimum space for new price =========================================

  useEffect(() => {
    const fetchMinimumSpace = async () => {
      try {
        const response = await axiosInstance.get(`/api/minimum-space`);
        if (response.data) {
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
        const response = await axiosInstance.get(`/api/project-services/`);
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

  // ============================== count  marked service number ===================================================

  // useEffect(() => {
  //   setMarkedServiceCount(markedItems.size);
  // }, [markedItems]);

  // ===============================================================================================================


  useEffect(() => {
    calculate_full_price();
  }, [markedItems, square_meter]);



  const calculate_full_price = () => {
    if (markedItems.size === 0) {
      setWarning('აირჩიეთ სერვისი');
      return;
    }
    let full_price = 0;

    markedItems.forEach(id => {
      const service = projectServices?.find(service => service.id === id);
      if (service && square_meter) {
        setWarning('');
        // console.log(
        //   `Service: ${service.name_ka}, 
        //   price_per_sqm_below: ${service.price_per_sqm_below}, 
        //   , price_per_sqm_above: ${service.price_per_sqm_above},
        //   Square meter: ${square_meter}`
        // );


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
      // console.log(`Total price before discount: ${full_price}`);
      const full_price_with_discount = full_price - (full_price * discount / 100);
      // console.log(`Total price after discount: ${full_price_with_discount}`);
      setFullPrice(full_price_with_discount);
    } else {
      // console.log(`Total price: ${full_price}`);
      setFullPrice(full_price);
    }
  };


  const clear_all = () => {
    setMarkedItems(new Set());
    setSquare_meter(null);
    setFullPrice(null);
    setWarning('');
  }


  const itemVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: (index: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: index * 0.1, // Adjust the delay between animations
      },
    }),
  };

  return (
    <div className="main_calculation_container">
      <div className="parent_div_line">
        <h2 className="select_service_h2" >{t("Select the desired service")}</h2>
        <div className="child_div_line"></div>
      </div>
      {warning && (
        <div className="warning_container">
          <h3>{warning}</h3>
        </div>
      )}
      <div className="services_container" >

        <h3 className="service_name" >{t("electricity")}</h3>
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
        <motion.div
          className="first_project_group_container"
          initial="hidden"
          animate="visible"
        >
          {electricalServices.map((service, index) => (
            <motion.p
              key={service.id}
              className={`project_checkmark ${markedItems.has(service.id) ? 'marked' : 'unmarked'}`}
              onClick={() => handleItemClick(service.id)}
              custom={index}
              variants={itemVariants}
            >
              {language === "en" ? service.name_en : service.name_ka}
            </motion.p>
          ))}
        </motion.div>

        <h3>{t("Mechanical")}</h3>
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
        <motion.div
          className="first_project_group_container"
          initial="hidden"
          animate="visible"
        >
          {mechanicalServices.map((service, index) => (
            <motion.p
              key={service.id}
              className={`project_checkmark ${markedItems.has(service.id) ? 'marked' : 'unmarked'}`}
              onClick={() => handleItemClick(service.id)}
              custom={index}
              variants={itemVariants}
            >
              {language === "en" ? service.name_en : service.name_ka}
            </motion.p>
          ))}
        </motion.div>

        <h3>{t("plumbing")}</h3>
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
        <motion.div
          className="first_project_group_container"
          initial="hidden"
          animate="visible"
        >
          {plumbingServices.map((service, index) => (
            <motion.p
              key={service.id}
              className={`project_checkmark ${markedItems.has(service.id) ? 'marked' : 'unmarked'}`}
              onClick={() => handleItemClick(service.id)}
              custom={index}
              variants={itemVariants}
            >
              {language === "en" ? service.name_en : service.name_ka}
            </motion.p>
          ))}
        </motion.div>


        <div className="calculation_container">
          <h3>{t("Area")}</h3>

          <div className="mobile_input_container" >
            <input
              className="square_meter_input"
              placeholder={t("Anter area")}
              type="number"
              value={square_meter !== null ? square_meter : ''}
              onChange={(e) => {
                const value = e.target.value;
                setSquare_meter(value === '' ? null : Number(value));
              }}
            />

            <button className="calculate_button clear" onClick={clear_all}>
              <span className="calculate_span">{t("Clear")}</span>
            </button>
          </div>
        </div>

        {fullPrice !== null && fullPrice > 0 && (
          <motion.div
            className="full_price_container"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3>{t("Total price")} {Number(fullPrice.toFixed(2))} ₾</h3>
          </motion.div>
        )}
      </div>


    </div>
  );
}


export default Calculate;

















// ელექტროობა,
// სახანძრო სიგნალიზაცია,
//  გახმოვანება, 
//  საევაკუაციო მანიშნებლები და განათება,
//   დაშვების კონტროლი,
//    ვიდეო მეთვალყურეობა, 
//    CO დეტექცია.
// ხანძარქრობა,
// სახანძრო ვენტილაცია,
// საყოფაცხოვრებო ვენტილაცია,
//  გათბობა გაგრილება,
//   კანალიზაცია.


// Electricity,
// Fire alarm,
// Public address system,
// Evacuation signs and lighting,
// Access control,
// Video surveillance,
// CO detection,
// Fire suppression,
// Fire ventilation,
// Residential ventilation,
// Heating and cooling,
// Sewerage.
