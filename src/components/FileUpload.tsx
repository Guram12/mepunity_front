import "../styles/FileUpload.css"
import { useState, useRef } from "react";
import axios from 'axios';
import { baseURL } from "../App";
import { RiUserSearchFill } from "react-icons/ri";
import { MdBusinessCenter } from "react-icons/md";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { LuMailSearch } from "react-icons/lu";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { FaFilePdf, FaFileAlt } from "react-icons/fa";
import { FaRegFileZipper } from "react-icons/fa6";
import { SiAutodesk } from "react-icons/si"; // DWG icon

const FileUpload: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [name, setName] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isFilesSending, setIsFilesSending] = useState<boolean>(false);
  const [filesAreSent, setFilesAreSent] = useState<boolean>(false);






  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prevFiles => [...prevFiles, ...newFiles]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files);
      setFiles(prevFiles => [...prevFiles, ...newFiles]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = (index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsFilesSending(true);
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });
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
      // setFiles([]);
      // setName('');
      // setCompany('');
      // setUserEmail('');
      // setSubject('');
      // setDescription('');

      setIsFilesSending(false);
      setFilesAreSent(true);
      setTimeout(() => {
        setFilesAreSent(false);
      }, 2000);
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Error uploading files');
    }
  };

  const renderFileIcon = (file: File) => {
    console.log(file.name, file.type);

    if (file.type.startsWith('image/')) {
      if (file.type === 'image/vnd.dwg') {
        return <SiAutodesk className="file_icon" />;
      }
      return <img src={URL.createObjectURL(file)} alt={file.name} />;
    } else if (file.name.endsWith('.zip')) {
      return <FaRegFileZipper className="file_icon" />;
    } else if (file.type === 'application/pdf') {
      return <FaFilePdf className="file_icon" />;
    } else if (file.name.toLowerCase().endsWith('.dwg')) {
      return <SiAutodesk className="file_icon" />;
    } else {
      return <FaFileAlt className="file_icon" />;
    }
  };

  const isFormValid = name !== '' && company !== '' && userEmail !== '';

  return (
    <div>
      {isFilesSending && (
        <div className="upload_loader_container" >
          <div className="dot-spinner loader_on_upload ">
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
      )}
      <div className="files_sent_container" >
        {filesAreSent && <p className="files_are_sent" >Files are sent successfully!</p>}
      </div>

      {/* upload main continer is this  */}
      <div
        className={`fileupload_main_container 
       ${isFilesSending ? 'blur_background' : ''} 
       ${filesAreSent ? 'blur_background' : ''}`}>
        <form onSubmit={handleSubmit}>
          {/* drag and drop container  */}
          <div className="drag_and_drop_container" >
            <div
              className={`drag_drop_area ${isDragging ? 'dragging' : ''}`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={handleClick}
            >
              <p className="drag_drop_p">Drag & Drop files here or click to select files</p>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                ref={fileInputRef}
                style={{ display: 'none' }}
              />
            </div>
          </div>

          <div className="file_preview">
            {files.map((file, index) => (
              <div key={index} className="file_preview_item">
                {renderFileIcon(file)}
                <span className="uploaded_file_name">{file.name}</span>
                <IoMdRemoveCircleOutline
                  className="remove_icon"
                  onClick={() => handleRemoveFile(index)}
                />
              </div>
            ))}
          </div>

          <div className="mother_inputs_group" >
            {/* 1 first big child  */}
            <div>
              <div className="upload_input_container">
                <RiUserSearchFill className="mark_email_icon_upload" />
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
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  required
                  className="upload_input"
                  placeholder='  Enter company name'
                />
              </div>
            </div>

            {/* 2 second big child  */}
            <div>
              <div className="upload_input_container">
                <MdOutlineMarkEmailRead className="mark_email_icon_upload" />
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  required
                  className="upload_input"
                  placeholder='  Enter Email'
                />
              </div>

              <div className="upload_input_container">
                <LuMailSearch className="mark_email_icon_upload" />
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="upload_input"
                  placeholder='  Enter Subject'
                />
              </div>
            </div>
          </div>

          <div className="upload_input_container">
            <MdOutlineLibraryBooks className='mark_email_icon_upload' />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="upload_input description_upload_input"
              placeholder=' Enter Description'
            />
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
    </div>

  );
};

export default FileUpload;