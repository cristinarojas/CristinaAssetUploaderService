// Dependencies
import React, { useState } from 'react';

// Styles 
import './uploader.scss';


const Uploader = () => {
  // Local State
  const [stept, setStep] = useState('Select file');

  // Handle image
  const loadFile = (event) => {
    let image = document.getElementById('output');
    image.src = URL.createObjectURL(event.target.files[0]);
    setStep('Upload file to S3');
  };

  return ( 
    <section className="uploaderContainer">

      <section className="selectorContainer">
        {
          stept === 'Select file' ? (
            <>
              <label htmlFor="fileUpload" className="customFileUpload">
                <i className="fa fa-cloud-upload"></i> {stept}
              </label>
              <input 
                id="fileUpload" 
                type="file" 
                accept="image/*" 
                name="image"  
                onChange={(e) => loadFile(e)}
              />
            </>
          ) : (
            <label htmlFor="fileUpload" className="customFileUpload">
              <i className="fa fa-cloud-upload"></i>  {stept}
            </label>
          )
        }

      </section>

      <section className="imageContainer">
        <img 
        className="outputFile"
          id="output" 
        />
      </section>
  
    </section>
  )
}

export default Uploader;