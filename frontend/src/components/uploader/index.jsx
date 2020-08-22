// Dependencies
import React, { useState } from 'react';

// Components
import Filelist from '../fileList';
import Message from '../shared/message';

// Styles 
import './uploader.scss';


const Uploader = () => {
  // Local State
  const [showImage, setShowImage] = useState(false);
  const [ filesInS3, setFilesInS3] = useState(0);
  const [showMessage, setShowMessage] = useState(false);

  // Handle image
  const loadFile = (e) => {
    let image = document.getElementById('output');
    let binaryData = [];

    binaryData.push(e.target.files[0]); 
    image.src = window.URL.createObjectURL(new Blob(binaryData, {type: "application/zip"})) 

    setShowImage(true);
  };

  // Upload to AWS S3
  const handleUpload = () => {
    console.log('entra!!!');
    // error set error message as a prop or good also prop
    setShowMessage(true);
  }

  return ( 
    <section className="mainContainer">

      <section className="allFileContainer">
        <Filelist 
          filesInS3={filesInS3} 
        />
      </section>

      <section className="uploaderContainer">
        <section className="selectorContainer">
          <label htmlFor="fileUpload" className="customFileUpload">
            <i className="fa fa-cloud-upload"></i> Select file
          </label>
          <input 
            id="fileUpload" 
            type="file" 
            accept="image/*" 
            name="image"  
            onChange={(e) => loadFile(e)}
          />
          
          {
            showImage ? (
              <label 
                onClick={handleUpload}
                className="uploadAWS">Upload to S3
            </label>
            ) : ''
          }

        </section>


        <section className="imageContainer">
          {
            showImage ? (
            <label className="fileInfo">Cristinawiththefish.jpg</label>
            ) : ''
          }
          <img 
            className="outputFile"
            id="output" 
          />
        </section>

        {
          showMessage ? <Message /> : ''
        }
      </section>
    </section>
  )
}

export default Uploader;