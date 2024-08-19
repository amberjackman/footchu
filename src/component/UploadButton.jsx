// src/components/UploadButton.js
import React from "react";
import uploadShoesData from "../data";

const UploadButton = () => {
  const handleUpload = () => {
    uploadShoesData();
  };

  return <button onClick={handleUpload}>Upload Shoe Data</button>;
};

export default UploadButton;
