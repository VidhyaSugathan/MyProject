import React, { useState } from "react";
import "./AddProduct.css";
import axios from "axios";
import pic from "./img/pics.jpg"
function AddProduct() {
  const [baseImage, setBaseImage] = useState("");
  const [title, setTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [price, setPrice] = useState('');

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBaseImage(base64);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const handleClick = () => {
    const url = "http://localhost:8080/addproduct";
    const header = {};
    const req = {
      Title: title,
      CompanyName: companyName,
      Price: price,
      Image: baseImage
    }
    console.log("req", req)
    axios.post(url, req, header)
      .then((res) => {
        console.log("Success", res.data)
        setTitle("");
        setCompanyName("");
        setPrice("");
        setBaseImage("");
      }).catch((error) => {
        console.error("Error", error);
      })
  }
  return (
    <div className="App">
      <div className="Image"><img src={pic} alt={''} /></div>
      <div className="Content">
        <label>Title</label>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <label>Company Name</label>
        <input
          type="text"
          placeholder="Company Name"
          value={companyName}
          onChange={(event) => setCompanyName(event.target.value)}
        />
        <label>Price</label>
        <input
          type="text"
          placeholder="Price"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
        <label>Upload Image</label>
        <input
          type="file"
          onChange={(e) => {
            uploadImage(e);
          }} />
        <br></br>
        <img src={baseImage} alt={''} height="200px" />
        <button type="submit" onClick={(e) => { handleClick(e) }}>Upload</button>
      </div>
    </div>
  );
}

export default AddProduct;