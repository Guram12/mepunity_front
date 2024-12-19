import "../styles/FileUpload.css"
import { useState, useRef, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { RiUserSearchFill } from "react-icons/ri";
import { MdBusinessCenter } from "react-icons/md";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { LuMailSearch } from "react-icons/lu";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { FaFilePdf, FaFileAlt } from "react-icons/fa";
import { FaRegFileZipper } from "react-icons/fa6";
import { SiAutodesk } from "react-icons/si"; // DWG icon
import { useTranslation } from "react-i18next";
import { scrollToTop } from "../utils/ScrollToTop";
import { motion } from "framer-motion"


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
  const [current_file_size, setCurrent_file_size] = useState<number>(0);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { t } = useTranslation();



  useEffect(() => {
    scrollToTop();
  }, []);

  // =========================================================================================
  const MAX_TOTAL_SIZE: number = 2 * 1024 * 1024 * 1024; // 2GB total


  // ===============================================================================================================

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const totalSize = newFiles.reduce((acc, file) => acc + file.size, 0) + files.reduce((acc, file) => acc + file.size, 0);
      if (totalSize) {
        setCurrent_file_size(totalSize);
      }
      if (totalSize > MAX_TOTAL_SIZE) {
        alert('Total file size exceeds 2GB limit.');
        return;
      }

      setFiles(prevFiles => [...prevFiles, ...newFiles]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files);
      const totalSize = newFiles.reduce((acc, file) => acc + file.size, 0) + files.reduce((acc, file) => acc + file.size, 0);
      setCurrent_file_size(totalSize);
      if (totalSize > MAX_TOTAL_SIZE) {
        alert('Total file size exceeds 2GB limit.');
        return;
      }

      setFiles(prevFiles => [...prevFiles, ...newFiles]);
    }
  };
  // ===============================================================================================================

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
  // ===============================================================================================================

  const handleRemoveFile = (index: number) => {
    setFiles(prevFiles => {
      const newFiles = prevFiles.filter((_, i) => i !== index);
      const totalSize = newFiles.reduce((acc, file) => acc + file.size, 0);
      setCurrent_file_size(totalSize);
      return newFiles;
    })

  };
  // ===============================================================================================================

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
      await axiosInstance.post(`/api/send-file/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(percentCompleted);  // Track progress on the frontend
            if (percentCompleted === 100) {
              setIsFilesSending(false);
              setFilesAreSent(true);
              setTimeout(() => {
                setFilesAreSent(false);
              }, 2000);
            }
          } else {
            setUploadProgress(0);
          }
        }
      });
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Error uploading files');
      setIsFilesSending(false);
    }
  };
  // ===============================================================================================================


  const renderFileIcon = (file: File) => {
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

  // ===============================================================================================================
  const isFormValid = name !== '' && company !== '' && userEmail !== '' && files.reduce((acc, file) => acc + file.size, 0) <= MAX_TOTAL_SIZE;

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
    <div>
      {isFilesSending && (
        <div className="upload_loader_container">
          <div className="dot-spinner loader_on_upload">
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
          </div>

          <div className="progress_bar">
            <div className="progress" style={{ width: `${uploadProgress}%` }}></div>
          </div>
          <p className="progres_percent">{uploadProgress.toFixed(0)}%</p>
          <p className="upload_progres_warning" >{t("File upload wait massage")}</p>

        </div>
      )}
      <div className="files_sent_container">
        {filesAreSent && <p className="files_are_sent">{t("Files are sent successfully")}</p>}
      </div>

      {/* upload main continer is this  */}
      <div
        className={`fileupload_main_container 
       ${isFilesSending ? 'blur_background' : ''} 
       ${filesAreSent ? 'blur_background' : ''}`}>
        <form onSubmit={handleSubmit}>

          {/* drag and drop container  */}
          <motion.div className="drag_and_drop_container"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="drag_area_contaner" >
              <div
                className={`drag_drop_area ${isDragging ? 'dragging' : ''}`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={handleClick}
              >
                <p className="drag_drop_p">{t("drag and drop")}</p>
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                />
              </div>
            </div>

            {current_file_size > 0 && (
              <div className="filesize_info_container"
              >
                <p className="file_size"
                  style={{ color: current_file_size > MAX_TOTAL_SIZE ? 'red' : 'inherit' }}
                >{t("File size:")} {current_file_size !== null ? (current_file_size / (1024 * 1024)).toFixed(2) + ' MB' : '0 MB'}</p>
                <p className="file_info" >{t("(Maximum size 2G)")}</p>
              </div>
            )}
          </motion.div>

          {/* file preview container  */}
          <motion.div className="file_preview"
            initial="hidden"
            animate="visible"
          >
            {files.map((file, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={itemVariants}

                className="file_preview_item"
              >
                {renderFileIcon(file)}
                <span className="uploaded_file_name">{file.name}</span>
                <IoMdRemoveCircleOutline
                  className="remove_icon"
                  onClick={() => handleRemoveFile(index)}
                />
                <p className="file_size_in_map" >{(file.size / (1024 * 1024)).toFixed(1) + " MB"}</p>
              </motion.div>
            ))}
          </motion.div>

          <div className="all_inputs_container" >

            <div className="mother_inputs_group" >
              {/* 1 first big child  */}
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <div
                  className="upload_input_container"

                >
                  <RiUserSearchFill className="mark_email_icon_upload" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="upload_input"
                    placeholder={t("Enter Username")}

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
                    placeholder={t("Enter company name")}
                  />
                </div>
              </motion.div>

              {/* 2 second big child  */}
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <div className="upload_input_container">
                  <MdOutlineMarkEmailRead className="mark_email_icon_upload" />
                  <input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    required
                    className="upload_input"
                    placeholder={t("Enter Email")}
                  />
                </div>

                <div className="upload_input_container">
                  <LuMailSearch className="mark_email_icon_upload" />
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="upload_input"
                    placeholder={t("Enter Subject")}
                  />
                </div>
              </motion.div>
            </div>

            <motion.div
              className="upload_inpur_cont_fr_description"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <MdOutlineLibraryBooks className='mark_email_icon_upload' />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="upload_input description_upload_input"
                placeholder={t("Enter Description")}
              />
            </motion.div>

          </div>

          < motion.div className="upload_button_container"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <button
              className="upload_button"
              type="submit"
              style={{ backgroundColor: isFormValid ? '#00a753' : '#313131', cursor: isFormValid ? 'pointer' : 'not-allowed' }}
              disabled={!isFormValid}
            >
              {t("Send")}
            </button>
          </motion.div>

        </form>
      </div>
    </div>

  );
};

export default FileUpload;