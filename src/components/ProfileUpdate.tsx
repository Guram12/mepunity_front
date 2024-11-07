import "../styles/ProfileUpdate.css";
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { baseURL } from "../App";
import { ProfileData } from "../App";

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
    } catch (error) {
      console.error('Error updating profile', error);
      alert('Failed to update profile');
    }
  };




  return (
    <div className="profile_update_main_container">
      <form className="profileupdate_input_container" onSubmit={handleSubmit}>
        <div className="profileupdate_input">
          <label>Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="profileupdate_input">
          <label>Company</label>
          <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} />
        </div>
        <div className="profileupdate_input">
          <label>Phone number</label>
          <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </div>
        <div className="profileupdate_input">
          <label>Profile Photo</label>
          <input type="file" onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)} />
        </div>
        <button type="submit">Update Profile</button>
      </form>
      {massage && <p>{massage}</p>}
    </div>
  );
};

export default ProfileUpdate;