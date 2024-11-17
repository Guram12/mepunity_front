// import React, { useEffect } from "react";
// import axiosInstance from "../utils/axiosInstance";

// declare global {
//   interface Window {
//     google: {
//       accounts: {
//         id: {
//           initialize: (options: { client_id: string; callback: (response: any) => void }) => void;
//           prompt: (callback?: (notification: any) => void) => void;
//           promptCalled?: boolean; // Custom flag to track prompt state
//         };
//       };
//     };
//   }
// }

// const GoogleOneTapLogin: React.FC = () => {
//   useEffect(() => {
//     if (!window.google || window.google.accounts.id.promptCalled) {
//       return;
//     }

//     window.google.accounts.id.initialize({
//       client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
//       callback: handleCredentialResponse,
//     });

//     const promptGoogleOneTap = () => {
//       window.google.accounts.id.prompt((notification) => {
//         if (notification.isDismissedMoment()) {
//           console.log("Google One Tap was dismissed.");
//         } else if (notification.isSkippedMoment()) {
//           console.log("Google One Tap was skipped.");
//           // Re-trigger the prompt if it was skipped due to tap_outside
//           window.google.accounts.id.prompt();
//         }
//       });
//     };

//     promptGoogleOneTap();

//     window.google.accounts.id.promptCalled = true; // Prevent multiple prompts
//   }, []);

//   const handleCredentialResponse = async (response: any) => {
//     console.log("Encoded JWT ID token: ", response.credential);
//     try {
//       const res = await axiosInstance.post("/dj-rest-auth/google/one-tap/", {
//         id_token: response.credential,
//       });
//       console.log("Backend response: ", res.data);
//       localStorage.setItem("access_token", res.data.access);
//       localStorage.setItem("refresh_token", res.data.refresh);
//     } catch (err) {
//       console.error("Error verifying token:", err);
//     }
//   };

//   return <div id="g_id_onload"></div>;
// };

// export default GoogleOneTapLogin;