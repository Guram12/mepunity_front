import { useLocation } from "react-router-dom";


const MarginElement: React.FC = () => {
  const location = useLocation();


  if (location.pathname === "/login" || location.pathname === "/register" ||
    location.pathname === "/password-reset" || location.pathname === "/reset-password/:uidb64/:token"
  ) {
    return
  }

  return (
    <div style={{ width: "100%", height: "80px" }}></div>
  )
}

export default MarginElement;












