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
      }, []);


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
        <>
        <aside className="col-md-3 mb-4 order-3 order-md-3">
            <div className="card shadow-sm">
                <div className="card-body">
                    <h5 className="card-title">Comments</h5>
                    
                        <textarea value={comment} className="form-control" placeholder="leave you comment here..." onChange={commentChangeHandler}></textarea>
                        <div className="d-grid">
                            <button onClick={formSubmitHandler} className="btn btn-primary btn-sm mt-2">Comment</button>
                        </div>
                    
                    <div className="comment-list">
                      <div className="overflow-auto mt-3" style={{maxHeight: 'calc(100vh - 250px)'}}>
                      {
                        comments.map((comment) => (
                          <div key={comment.id} className="comment-item mb-3">
                            <CommentList  fields={comment} deleteHandler={deleteHandler} setComments={setComments}/>
                          </div>
                        ))
                      }
                      </div>
                    </div>
                </div>
            </div>
        </aside>
        </>
    )
}