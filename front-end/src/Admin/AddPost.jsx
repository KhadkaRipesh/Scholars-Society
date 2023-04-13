import React, { useEffect, useState } from "react";
import styles from "./AddPost.module.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddPost() {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const data = localStorage.getItem("userName");
    setUserName(data);
  }, []);


  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  let data = { title, description, userName };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:4000/addPost", data)
      .then((response) => {
        toast.success("Added Successfully");
        setTitle("");
        setDescription("");
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.data) {
          const errorMessages = error.response.data.errors.map(
            (error) => error.message
          );
          errorMessages.forEach((errorMessage) => {
            toast.error(errorMessage);
          });
        }
      });
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <ToastContainer />
        <label>
          Title:
          <input
            type="text"
            value={title}
            className={styles.title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
        <label>
          Description:
          <textarea
            value={description}
            className={styles.textarea}
            onChange={(event) => setDescription(event.target.value)}
          />
        </label>
        <button className="button" type="submit">
          Add Post
        </button>
      </form>
      <h1>Added Post or Announcement.</h1>
      
    </>
  );
}

export default AddPost;
