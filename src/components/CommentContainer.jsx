import CommentList from "./CommentList"
import { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom";


export default function CommentContainer(){
    const [comment, setComment] = useState({
        text: ""
    });
    const [comments, setComments] = useState([])
    const {id} = useParams();

    useEffect(() => {
        axios
          .get(`http://127.0.0.1:8000/posts/add-comment/${id}/`)
          .then((response) => {
            setComments(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      }, []);


    const commentChangeHandler = (e) =>{
        setComment({text:e.target.value});
        console.log(e.target.value)
    }
    const formSubmitHandler = () => {
        try{
            axios.post(`http://127.0.0.1:8000/posts/add-comment/${id}/`, comment)
            console.log(comment)
        }catch(error){
            console.error(error)
        }
    }
    return (
        <>
        <aside className="col-md-3 mb-4 order-3 order-md-3">
            <div className="card shadow-sm">
                <div className="card-body">
                    <h5 className="card-title">Comments</h5>
                    <form className="mb-3" onSubmit={formSubmitHandler}>
                        <textarea name="" id="" className="form-control" placeholder="leave you comment here..." onChange={commentChangeHandler}></textarea>
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary btn-sm mt-2">Comment</button>
                        </div>
                    </form>
                    <div className="comment-list">
                        {
                            comments.map((comment) => (
                                <CommentList text={comment.text}/>
                            ))
                        }
                    </div>
                </div>
            </div>
        </aside>
        </>
    )
}