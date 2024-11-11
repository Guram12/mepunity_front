import "../styles/ProfileUpdate.css";
import "../styles/Loader.css"
import axiosInstance from "../utils/axiosInstance";
import React, { useState, useEffect } from 'react';
import { ProfileData } from "../App";
import { RiUserSearchFill } from "react-icons/ri";
import { MdBusinessCenter } from "react-icons/md";
import { ImMobile2 } from "react-icons/im";
import default_profile_image from "../assets/default.jpg"
import { GrUpdate } from "react-icons/gr";
import { RxDoubleArrowDown } from "react-icons/rx";
import { useTranslation } from "react-i18next";
import { scrollToTop } from "../utils/ScrollToTop";



interface ProfileUpdateProps {
  profileData: ProfileData | null;
  setProfileUpdated: (profileUpdated: boolean) => void;
  profileUpdated: boolean;
}

const ProfileUpdate: React.FC<ProfileUpdateProps> = ({ profileData, profileUpdated, setProfileUpdated }) => {
  const [phoneNumber, setPhoneNumber] = useState<string>(profileData?.phone_number || '');
  const [company, setCompany] = useState<string>(profileData?.company || '');
  const [username, setUsername] = useState<string>(profileData?.username || '');
  const [image, setImage] = useState<File | null>(null);
  const [massage, setMassage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);


  const { t } = useTranslation();

  useEffect(() => {
    scrollToTop();
  }, []);

  // =========================================================================================
  useEffect(() => {
    if (profileData) {
      setPhoneNumber(profileData.phone_number || '');
      setCompany(profileData.company || '');
      setUsername(profileData.username || '');
      setImagePreview(null);
    }
  }, [profileData]);



  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  // ============================  subbmit and update ============================

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('phone_number', phoneNumber);
    formData.append('company', company);
    formData.append('username', username);
    if (image) {
      formData.append('image', image);
    }

    try {
      const accessToken = localStorage.getItem('access_token');
      await axiosInstance.put(`/auth/profile/update/`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setProfileUpdated(!profileUpdated);
      setMassage('Profile updated successfully');
      setLoading(false);
      setTimeout(() => {
        setMassage('');
      }, 3000);
    } catch (error) {
      console.error('Error updating profile', error);
      alert('Failed to update profile');
      setLoading(false);
    }
  };

// =========================================   update button validationm ====================================
const isformvalid = (
  phoneNumber !== profileData?.phone_number ||
  company !== profileData?.company ||
  username !== profileData?.username ||
  imagePreview !== null
);


  if (!profileData) {
    return (
      <div className="loader_on_profiledata">
        <div className="dot-spinner"  >
          <div className="dot-spinner__dot"></div>
          <div className="dot-spinner__dot"></div>
          <div className="dot-spinner__dot"></div>
          <div className="dot-spinner__dot"></div>
          <div className="dot-spinner__dot"></div>
          <div className="dot-spinner__dot"></div>
          <div className="dot-spinner__dot"></div>
          <div className="dot-spinner__dot"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="profile_update_main_container">
      <h1 className="profile_update_h1" >{t("Profile Update")}</h1>


      <form className="profile_update_form" onSubmit={handleSubmit}>
        <div className="profile_photo_container">
          <img src={profileData?.image || default_profile_image} alt="profile picture" className="profile_update_picture" />
          <button className="container-btn-file">
            {t("Change Profile Picture")}
            <input
              type="file"
              onChange={handleImageChange}
              className="file"
              name="text"
            />
          </button>
          {imagePreview && (
            <div className="image_preview_container">
              <RxDoubleArrowDown className="down_icon" />
              <img src={imagePreview} alt="Image Preview" className="image_preview" />
            </div>
          )}

        </div>

        <div className="profileupdate_input_container">
          <RiUserSearchFill className='profile_update_icons' />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="profile_update_input"
            placeholder={t("Enter Username")}
          />
        </div>

        <div className="profileupdate_input_container">
          <MdBusinessCenter className='profile_update_icons' />
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="profile_update_input"
            placeholder={t("Enter Company Name")}
          />
        </div>

        <div className="profileupdate_input_container">
          <ImMobile2 className='profile_update_icons' />
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="profile_update_input"
            placeholder={t("Enter Phone Number")}
          />
        </div>

        <div className="profile_update_button_container" >
          {!loading ?
            <>
              <button
                type="submit"
                className={`profile_update_button ${!isformvalid ? "disabled_btn" : "emabled_btn"}`}
                disabled={!isformvalid}
              >
                {t("Update Profile")}
              </button>
              <GrUpdate  className="update_icon" />
            </>
            :
            <div className="dot-spinner"  >
              <div className="dot-spinner__dot"></div>
              <div className="dot-spinner__dot"></div>
              <div className="dot-spinner__dot"></div>
              <div className="dot-spinner__dot"></div>
              <div className="dot-spinner__dot"></div>
              <div className="dot-spinner__dot"></div>
              <div className="dot-spinner__dot"></div>
              <div className="dot-spinner__dot"></div>
            </div>
          }
        </div>

      </form>
      {massage && <p className="profileupdate_massage">{massage}</p>}
    </div>
  );
};

export default ProfileUpdate;