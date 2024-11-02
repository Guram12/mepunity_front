import "../styles/FileUpload.css"
import { useState } from "react";
import axios from 'axios';
import { baseURL } from "../App";
import { RiUserSearchFill } from "react-icons/ri";
import { MdBusinessCenter } from "react-icons/md";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { LuMailSearch } from "react-icons/lu";
import { MdOutlineLibraryBooks } from "react-icons/md";




const FileUpload: React.FC = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    if (files) {
      Array.from(files).forEach(file => {
        formData.append('files', file);
      });
    }
    formData.append('name', name);
    formData.append('company', company);
    formData.append('email', userEmail);
    formData.append('subject', subject);
    formData.append('description', description);

    try {
      await axios.post(`${baseURL}/api/send-file/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Files uploaded successfully');
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Error uploading files');
    }
  };


  // ================================  check if form is valid ================================
  const isFormValid = name !== '' && company !== '' && userEmail !== ''
  // ============================================================================================



  return (
    <div className="fileupload_main_container" >

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Files:
            <input
              type="file"
              multiple
              onChange={handleFileChange}
            />
          </label>
        </div>

        <div className="upload_input_container" >
          <RiUserSearchFill className='mark_email_icon_upload' />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="upload_input"
            placeholder='  Enter Username'
          />
        </div>

        <div className="upload_input_container">
          <MdBusinessCenter className='mark_email_icon_upload' />

          <label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
              className="upload_input"
              placeholder='  Enter company name'
            />
          </label>
        </div>

        <div className="upload_input_container">
          <MdOutlineMarkEmailRead className='mark_email_icon_upload' />

          <label>
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              required
              className="upload_input"
              placeholder='  Enter Email'
            />
          </label>
        </div>

        <div className="upload_input_container">
          <LuMailSearch className='mark_email_icon_upload' />
          <label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="upload_input"
              placeholder='  Enter Subject'
            />
          </label>
        </div>

        <div className="upload_input_container">
          <MdOutlineLibraryBooks className='mark_email_icon_upload' />
          <label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="upload_input"
              placeholder='  Enter Description'
            />
          </label>
        </div>


        <button
          className="upload_button"
          type="submit"
          style={{ backgroundColor: isFormValid ? '#00a753' : '#313131', cursor: isFormValid ? 'pointer' : 'not-allowed' }}
          disabled={!isFormValid}
        >
          Send
        </button>
      </form>
    </div>

  );
};

export default FileUpload;