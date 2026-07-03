import CommentList from "./CommentList"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import api from "../api/api";

export default function CommentContainer(){
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([])
    const {id} = useParams();

    useEffect(() => {
        if (!id) return;
        api
          .get(`/posts/add-comment/${id}/`)
          .then((response) => {
            setComments(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      }, [id]);


    const commentChangeHandler = (e) =>{
        setComment(e.target.value);
    }
    const formSubmitHandler = async () => {
      if (comment !== "") {
        const data = {
          text:comment,
        }
        setComment("")
        try {
          await api.post(
            `/posts/add-comment/${id}/`,data);

          await api.get(`/posts/add-comment/${id}/`)
            .then((response) => {
              setComments(response.data);
            })
            .catch((error) => {
              console.error(error);
            });
        } catch (error) {
          console.error(error);
        }
      } 
    };

    const deleteHandler = (pid, cid) => {
        if(confirm("are you sure you want to delet this comment")){
            api.delete(`/posts/comment-update-delete/${cid}/`)
            .catch((error)=>{
                console.log(error)
            })
        }
        api
          .get(`/posts/add-comment/${pid}/`)
          .then((response) => {
            setComments(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
    }
    return (
        <aside className="col-12 col-lg-3 sidebar-panel order-2 order-lg-3">
            <div className="card shadow-sm">
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">Comments</h5>

                    <div className="comment-form">
                        <textarea
                            value={comment}
                            className="form-control"
                            placeholder="Leave your comment here..."
                            onChange={commentChangeHandler}
                            rows={3}
                        />
                        <div className="d-grid">
                            <button onClick={formSubmitHandler} className="btn btn-primary btn-sm mt-2">Comment</button>
                        </div>
                    </div>

                    <div className="comment-list flex-grow-1">
                        <div className="sidebar-scroll sidebar-scroll--comments mt-3">
                            {
                                comments.map((comment) => (
                                    <div key={comment.id} className="comment-item">
                                        <CommentList fields={comment} deleteHandler={deleteHandler} setComments={setComments}/>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    )
}
