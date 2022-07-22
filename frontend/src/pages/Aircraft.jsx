/* eslint-disable import/no-duplicates */
import Header from "@components/Header";
import { useState, useEffect, useMemo } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import UserContext from "@contexts/UserContext";
import axios from "@services/axios";
import formatDate from "@services/dateFormat";
import "@styles/Aircraft.scss";
import Comment from "@components/Comment";
import CommentPopup from "@components/CommentPopup";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

const Aircraft = ({ data }) => {
  const query = useQuery();
  const { user } = useContext(UserContext);
  const [commentList, setCommentList] = useState();

  const fetchComments = async () => {
    const commentListFetch = await axios
      .get(`comments?aircraft=${data.id}`)
      .then((result) => {
        const commentFetch = result.data;
        commentFetch.forEach((comment) => {
          const date = formatDate(comment.postedDate);
          const editDate = formatDate(comment.editDate);
          /* eslint-disable-next-line */
          comment.postedDate = date;
          /* eslint-disable-next-line */
          comment.editDate = editDate;
          return comment;
        });
        return commentFetch;
      });
    setCommentList(commentListFetch);
  };

  useEffect(() => {
    if (data) {
      fetchComments();
    }
  }, [data]);

  const navigate = useNavigate();
  return (
    <div className="page">
      <Header />
      {query.get("comment") && user && data && (
        <CommentPopup
          type={query.get("comment")}
          commentId={query.get("id")}
          acId={data.id}
          fetchComments={fetchComments}
        />
      )}
      {data && (
        <div className="acContent">
          <section className="aircraft-info">
            <button
              type="button"
              className="goBack"
              onClick={() => navigate(-1)}
            >
              {"< Go back"}
            </button>
            <h1>
              {data.manufacturer}{" "}
              <span className="aircraft-title">{data.name}</span>
            </h1>
            <img
              src={`${import.meta.env.VITE_BACKEND_ASSETS}images/aircraft/${
                data.imgLink
              }`}
              alt=""
            />
            <div className="description">
              <h2>Description</h2>
              <p className="aircraft-desc">{data.desc}</p>
            </div>
          </section>
          <section className="comments">
            <header className="commentHeader">
              <h1>
                {commentList && commentList.length !== 0
                  ? commentList.length
                  : "0"}{" "}
                Comment
                {commentList && commentList.length <= 1 ? "" : "s"}
              </h1>
              {user && (
                <NavLink to="?comment=new" className="newComment">
                  Post a comment
                </NavLink>
              )}
            </header>

            <ul className="commentList">
              {commentList &&
                commentList.map((comment) => (
                  <li>
                    <Comment
                      commentData={comment}
                      fetchComments={fetchComments}
                    />
                  </li>
                ))}
            </ul>
          </section>
        </div>
      )}
    </div>
  );
};

export default Aircraft;
