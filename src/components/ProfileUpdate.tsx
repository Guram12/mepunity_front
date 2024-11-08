import "../styles/ProfileUpdate.css";
import "../styles/Loader.css"
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { baseURL } from "../App";
import { ProfileData } from "../App";
import { RiUserSearchFill } from "react-icons/ri";
import { MdBusinessCenter } from "react-icons/md";
import { ImMobile2 } from "react-icons/im";
import default_profile_image from "../assets/default.jpg"
import { GrUpdate } from "react-icons/gr";


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



  useEffect(() => {
    if (profileData) {
      setPhoneNumber(profileData.phone_number || '');
      setCompany(profileData.company || '');
      setUsername(profileData.username || '');
    }
  }, [profileData]);



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
      await axios.put(`${baseURL}/auth/profile/update/`, formData, {
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
      <h1 className="profile_update_h1" >Profile Update</h1>


      <form className="profile_update_form" onSubmit={handleSubmit}>
        <div className="profile_photo_container">
          <img src={profileData?.image || default_profile_image} alt="profile picture" className="profile_update_picture" />
          <button className="container-btn-file">
            Change Profile Picture
            <input
              type="file"
              onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
              className="file"
              name="text"
            />
          </button>

        </div>

        <div className="profileupdate_input_container">
          <RiUserSearchFill className='profile_update_icons' />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="profile_update_input"
            placeholder="  Username"
          />
        </div>

        <div className="profileupdate_input_container">
          <MdBusinessCenter className='profile_update_icons' />
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="profile_update_input"
            placeholder="  Company"
          />
        </div>

        <div className="profileupdate_input_container">
          <ImMobile2 className='profile_update_icons' />
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="profile_update_input"
            placeholder="  Phone number"
          />
        </div>

        <div className="profile_update_button_container" >
          {!loading ?
            <>
              <button type="submit" className="profile_update_button">Update Profile</button>
              <GrUpdate />
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