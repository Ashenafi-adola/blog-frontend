import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/api";

export default function PostContent(props){
    const navigate = useNavigate();
    const [like, setLike] = useState({
        post:0,
        user:[]
    })
    const [dislike, setDislike] = useState({
        post: 0,
        user: []
    })
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);

    
    const deleteHandler = () => {
        alert("are you sure you want to delete the post?")
        api.delete(`/posts/post-detail/${props.id}/`)
        navigate("/home")
    }
    const {id} = useParams();

    useEffect(()=>{
        api.get(`/posts/post-like/${id}/`)
        .then((response)=>{
            setLike(response.data);
            setLikes(response.data.user.length);
        }).catch((error) =>{
            console.log(error);
        })
    },[])

    useEffect(()=>{
        api.get(`/posts/post-dislike/${id}/`)
        .then((response) =>{
            setDislike(response.data);
            setDislikes(response.data.user.length)
        }).catch((error) =>{
            console.log(error);
        })
    },[])

    const reactionHandler = (e) => {
      if (e.target.name === "like") {
        api
          .get(`/posts/post-like/${id}/`)
          .then((response) => {
            setLike(response.data);
            setLikes(response.data.user.length);
          })
          .catch((error) => {
            console.log(error);
          });
        try {
          api.put(`/posts/post-like/${id}/`, null);
        } catch (error) {
          console.log(error);
        }
      } else {
        api
          .get(`/posts/post-dislike/${id}/`)
          .then((response) => {
            setDislike(response.data);
            setDislikes(response.data.user.length);
          })
          .catch((error) => {
            console.log(error);
          });
        try {
          api.put(`/posts/post-dislike/${id}/`, null);
        } catch (error) {
          console.log(error);
        }
      }
    };

    return (
        <>
            <main className="col-md-6 mb-4 order-2 order-md-2">
                <article className="card shadow-sm">
                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                            <div>
                                <h4 className="card-title mb-0">{props.title}</h4>
                                <small className="text-muted">{props.updated_at}</small>
                            </div>
                            <div className="text-end">
                                <button onClick={reactionHandler} name="like" className="btn btn-sm btn-outline-primary me-1">👍 {likes}</button>
                                <button onClick={reactionHandler} name="dislike" className="btn btn-sm btn-outline-secondary">👎 {dislikes}</button>
                                <div className="mt-2 text-muted small">Views 👁️ 13</div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <img src={props.image} alt="post image" className="img-fluid rounded"/>
                        </div>
                        <p className="card-text">{props.description}</p>
                        <div className="mt-3">
                            <Link to="" className="btn btn-sm btn-outline-success me-2">Edit</Link>
                            <button onClick={deleteHandler} className="btn btn-sm btn-outline-danger">Delete</button>
                        </div>
                    </div>
                </article>
            </main>
        </>
    )
}