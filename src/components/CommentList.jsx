import { jwtDecode } from "jwt-decode";
import api, { ACCESS_TOKEN } from "../api/api";
import { useState, useEffect } from "react";

export default function CommentList({fields, deleteHandler}){
    const [commenter, setCommenter] = useState(0);
    const [editMode, setEditMode] = useState(false);
    const [comment, setComment] = useState(fields.text);
  
    useEffect(()=>{
        api.get(`/accounts/get-user-id/${fields.user}`)
        .then((response)=>{
            setCommenter(response.data.id)
        })
    },[])

    const commentChangeHandler = (e) =>{
        setComment(e.target.value);
    }
    const changeEditMode = () => {
        setEditMode(!editMode)
    }
    const deleteComment = () => {
        deleteHandler(fields.post, fields.id)
    }

    const commentSubmitHandler = () => {
        api.put(`/posts/comment-update-delete/${fields.id}/`, {text: comment})
        .catch((error)=>{
            alert(error)
        })
        setEditMode(!editMode)
        
    }

    const token = localStorage.getItem(ACCESS_TOKEN);
    let userId = 0; 
    if (token){
        userId = jwtDecode(token).user_id;
    }

    if (editMode){
        return (
            <>
                <textarea value={comment} className="form-control" placeholder="leave you comment here..." onChange={commentChangeHandler}></textarea>
                <div className="d-grid">
                    <button onClick={commentSubmitHandler} className="btn btn-primary btn-sm mt-2">Update</button>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="bg-light p-3 rounded-3 shadow-sm">
                <small className="fw-semibold">@{fields.user}</small><br />
                <small className="small text-muted">{fields.commented_at.slice(0,10)}</small>
                <p className="mt-2">{comment}</p>
            </div>
            {   userId == commenter ?
                (<div className="mt-3 d-flex gap-2">
                    <button onClick={changeEditMode} className="btn btn-sm btn-outline-success">Edit</button>
                    <button onClick={deleteComment} className="btn btn-sm btn-outline-danger">Delete</button>
                </div>): <div></div>
            }
        </>
    )
}