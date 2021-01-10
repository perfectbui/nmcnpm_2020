import React, { useState, useEffect } from "react";

import "./Form.css";
import Aux from "../../hoc/Auxiliary";
import Backdrop from "../UI/Backdrop/Backdrop";
import Axios from "axios";

const Form = (props) => {
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [date, setDate] = useState();
  const [image, setImage] = useState();
  const [content, setContent] = useState();
  const [test, setTest] = useState();

  const postHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    Axios({
      method: "post",
      url: "/api/posts/uploadImg",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        "X-Requested-with": "XMLHttpRequest",
      },
    })
      .then((response) => {
        const image = response.data.imageUrl;

        Axios({
          method: "post",
          url: "/api/posts",
          data: { name, address, date, content, image, test },
          headers: {
            "X-Requested-with": "XMLHttpRequest",
          },
        })
          .then((response) => {
            window.location.reload();
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

  return (
    <Aux>
      <Backdrop show={props.show} click={props.click} />
      <form className="form">
        <h2>COMPANY INFORMATION</h2>
        <input
          type="text"
          placeholder="Company Name"
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          onChange={(event) => setAddress(event.target.value)}
        />
        <input
          type="date"
          placeholder="Date"
          onChange={(event) => setDate(event.target.value)}
        />
        <label htmlFor="upload-photo">
          {image ? image.name : "Upload your company image..."}
        </label>
        <input
          id="upload-photo"
          style={{ display: "none" }}
          type="file"
          accept="image/*"
          onChange={(event) => setImage(event.target.files[0])}
        />
        <textarea
          className="txt-introduce"
          placeholder="Introduce about your company..."
          onChange={(event) => setContent(event.target.value)}
        />
        <textarea
          className="test"
          placeholder="Create your company test"
          onChange={(event) => setTest(event.target.value)}
        />
        <button className="btn-post" onClick={(event) => postHandler(event)}>
          POST
        </button>
      </form>
    </Aux>
  );
};

export default Form;
