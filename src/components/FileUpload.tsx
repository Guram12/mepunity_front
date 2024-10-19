import { useState } from "react";
import axios from 'axios';
import { baseURL } from "../App";

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

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Files:
          <input
            type="file"
            multiple
            onChange={handleFileChange} />
        </label>
      </div>

      <div>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
      </div>

      <div>
        <label>
          Company:
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required />
        </label>
      </div>
      <div>
        <label>
          Email:
          <input
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Subject:
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default FileUpload;