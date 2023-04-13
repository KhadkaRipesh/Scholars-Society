import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./AddedPost.module.css";

function AddedPost() {
  const [userName, setUserName] = useState("");
  const [posts, setPosts] = useState([]);

  const [editing, setEditing] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("userName");
    setUserName(data);
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/posts/${userName}`)
      .then((response) => {
        setPosts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userName]);

  const deletePost = (postId) => {
    axios
      .delete(`http://localhost:4000/api/posts/${postId}`)
      .then((response) => {
        setPosts(posts.filter((post) => post.id !== postId));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = (postId) => {
    setEditing(postId);
  };

  const handleSave = (id) => {
    axios
      .put(`http://localhost:4000/api/posts/${id}`, {
        title: title,
        description: description,
      })
      .then((response) => {
        const updatedPost = response.data;
        setPosts(
          posts.map((post) => {
            if (post.id === updatedPost.id) {
              return updatedPost;
            }
            return post;
          })
        );
        setEditing(null);
        setTitle("");
        setDescription("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className={styles.addedPost}>
        {posts.map((post) => (
          <div key={post.id} className={styles.border}>
            <div className={styles.update}>
              {editing === post.id ? (
                <form >
                  <input
                    type="text"
                    className={styles.title2}
                    value={title}
                    placeholder="Title"
                    onChange={(event) => setTitle(event.target.value)}
                  />
                  <textarea
                    value={description}
                    className={styles.textarea}
                    placeholder="Description"
                    onChange={(event) => setDescription(event.target.value)}
                  ></textarea>
                  <br />
                  <button onClick={() => handleSave(post.id)}>Save</button>
                  <button onClick={() => setEditing(null)}>Cancel</button>
                </form>
              ) : (
                <div className={styles.content}>
                  <h2>{post.title}</h2>
                  <p onClick={() => handleEdit(post.id)}>Edit</p>
                  <p onClick={() => deletePost(post.id)}>Delete</p>
                </div>
              )}
            </div>
            <p>{post.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default AddedPost;
