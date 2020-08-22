// Dependencies
import React from 'react';

// Styles 
import './fileList.scss';

const Filelist = ({ filesInS3 }) => {

  return ( 
    <section className="fileList">
        <h2>Current files in S3: </h2>
        <span>{filesInS3}</span>
    </section>
  )
}

export default Filelist;