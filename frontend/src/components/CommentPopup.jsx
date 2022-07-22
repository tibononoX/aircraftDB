import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "@services/axios";
import "@styles/CommentPopup.scss";

const CommentPopup = ({ type, commentId, acId, fetchComments }) => {
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const commentData = {
      aircraft_id: acId,
      text,
    };

    try {
      await axios
        .post("comments", commentData, {
          withCredentials: true,
        })
        .then((response) => response.data);
      fetchComments();
      return navigate(-1);
    } catch (err) {
      return alert(err?.response.data);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    const commentData = {
      aircraft_id: acId,
      text,
    };

    try {
      await axios
        .put(`comments/${commentId}`, commentData, {
          withCredentials: true,
        })
        .then((response) => response.data);
      fetchComments();
      return navigate(-1);
    } catch (err) {
      return alert(err?.response.data);
    }
  };

  const fetchCommentById = async () => {
    try {
      const newComment = await axios
        .get(`comments/${commentId}`, { withCredentials: true })
        .then((result) => result.data);
      if (!newComment) {
        return console.warn("Comment not found");
      }
      setText(newComment.text);
    } catch (err) {
      return err;
    }
    return null;
  };

  useEffect(() => {
    if (type === "edit") {
      fetchCommentById();
    }
  }, []);

  switch (type) {
    case "new":
      return (
        <div className="popup">
          <section className="popupCard">
            <button
              type="button"
              className="goBack"
              onClick={() => navigate(-1)}
            >
              X
            </button>
            <h1>Post a new comment</h1>
            <form onSubmit={handleSubmit}>
              <textarea
                cols="30"
                rows="10"
                placeholder="Enter your comment ..."
                onChange={(e) => setText(e.target.value)}
              />
              <button type="submit">Post comment</button>
            </form>
          </section>
        </div>
      );
    case "edit":
      return (
        <div className="popup">
          <section className="popupCard">
            <button
              type="button"
              className="goBack"
              onClick={() => navigate(-1)}
            >
              X
            </button>
            <h1>Edit comment</h1>
            <form onSubmit={handleEdit}>
              <textarea
                cols="30"
                rows="10"
                value={text}
                placeholder="Enter your comment ..."
                onChange={(e) => setText(e.target.value)}
              />
              <button type="submit">Post comment</button>
            </form>
          </section>
        </div>
      );

    default:
      return null;
  }
};

export default CommentPopup;
