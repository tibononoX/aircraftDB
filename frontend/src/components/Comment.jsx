import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "@contexts/UserContext";
import axios from "@services/axios";
import "@styles/Comment.scss";

const Comment = ({ commentData, fetchComments }) => {
  const { user } = useContext(UserContext);
  const [likes, setLikes] = useState();

  const deleteComment = async () => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      try {
        await axios.delete(`comments/${commentData.id}`, {
          withCredentials: true,
        });
        return fetchComments();
      } catch (err) {
        return alert("Something went wrong");
      }
    }
    return null;
  };

  const fetchLikes = () => {
    axios
      .get(`comments/vote/${commentData.id}`)
      .then((result) => result.data)
      .then((data) => setLikes(data.length));
  };

  const handleLikes = async () => {
    try {
      await axios.post(
        `comments/vote`,
        { commentId: commentData.id },
        {
          withCredentials: true,
        }
      );
      return fetchLikes();
    } catch (err) {
      return alert("Something went wrong");
    }
  };

  useEffect(() => {
    fetchLikes();
  }, []);

  return (
    commentData && (
      <div className="comment">
        <div className="commentContent">{commentData.text}</div>
        <div className="commentInfo">
          {commentData.postedDate.fullDMY} at {commentData.postedDate.hour} by{" "}
          <span className="bold">{commentData.postedBy}</span>
          {commentData.postedDate.originalDate !==
            commentData.editDate.originalDate &&
            `, last edited at ${commentData.editDate.fullDMY} at ${commentData.editDate.hour}`}
          <div className="interactions">
            <p>{likes} likes</p>

            {user && (
              <button type="button" className="like" onClick={handleLikes}>
                Like
              </button>
            )}

            {user && commentData.user_id === user.id && (
              <NavLink
                to={`?comment=edit&id=${commentData.id}`}
                type="button"
                className="editComment"
              >
                Edit
              </NavLink>
            )}
            {user && commentData.user_id === user.id && (
              <button
                type="button"
                className="deleteComment"
                onClick={deleteComment}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default Comment;
