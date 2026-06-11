import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api, { ACCESS_TOKEN } from "../api/api";
import { jwtDecode } from 'jwt-decode'

export default function PostContent(props){
    const navigate = useNavigate();
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [views, setViews] = useState(0);
    const [like, setLike] = useState({
        post:0,
        user:[]
    })
    const [dislike, setDislike] = useState({
        post:0,
        user:[]
    })
    const [posterId, setPosterId] = useState(0);

    useEffect(()=>{
        api.get(`/accounts/get-user-id/${props.post.user}`)
        .then((response)=>{
            setPosterId(response.data.id)
        })
    },[])

    const {id} = useParams();
    const token = localStorage.getItem(ACCESS_TOKEN);
    let userId = 0
    if (token){
        userId = jwtDecode(token).user_id;
    }

    useEffect(()=>{
        api.get(`/posts/views/${props.post.id}/`)
        .then((response)=>{
            setViews(response.data.user.length)
        }).catch((error)=>{
            alert(error)
        })
    },[])

    
    const deleteHandler = () => {
        if(confirm("are you sure you want to delete the post?")){
            api.delete(`/posts/post-detail/${props.id}/`)
            navigate("/home")
        }
    }

    useEffect(()=>{
        api.get(`/posts/postlike/${id}/`)
        .then((response)=>{
            setLikes(response.data.user.length);
            setLike(response.data)
        }).catch((error) =>{
            console.log(error);
        })
    },[])

    useEffect(()=>{
        api.get(`/posts/postdislike/${id}/`)
        .then((response) =>{
            setDislikes(response.data.user.length)
            setDislike(response.data)
        }).catch((error) =>{
            console.log(error);
        })
    },[])

    const likeHandler = async () => {
      try {
        if(token){
            await api.put(`/posts/postlike/${id}/`, like);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const dislikeHandler = async () => {
      try {
        if(token){
            await api.put(`/posts/postdislike/${id}/`, dislike);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const reactionHandler = async (e) => {
      e.preventDefault();
      await api
        .get(`/posts/postlike/${id}/`)
        .then((response) => {
          setLikes(response.data.user.length);
        })
        .catch((error) => {
          console.log(error);
        });
      await api
        .get(`/posts/postdislike/${id}/`)
        .then((response) => {
          setDislikes(response.data.user.length);
        })
        .catch((error) => {
          console.log(error);
        });
    };



    const dateString = props.post.updated_at;
    const date = new Date(dateString).toDateString();
    const update_url = `/update-post/${id}`


    return (
        <>
            <main className="col-md-6 mb-4 order-2 order-md-2">
              <div className="overflow-auto" style={{maxHeight: 'calc(100vh - 120px)'}}>
              <article className="card shadow-sm">
                <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                            <div>
                                <h4 className="card-title mb-0">{props.post.title}</h4>
                                <small>@{props.post.user}</small><br />
                                <small className="text-muted">{date}</small>
                            </div>
                            <form onSubmit={reactionHandler}>
                                <div className="text-end">
                                    <button type="submit" onClick={likeHandler} name="like" className="btn btn-sm btn-outline-primary me-1">👍 {likes}</button>
                                    <button type="submit" onClick={dislikeHandler} name="dislike" className="btn btn-sm btn-outline-secondary">👎 {dislikes}</button>
                                    <div className="mt-2 text-muted small">{views}👁️</div>
                                </div>
                            </form>
                        </div>
                        <div className="mb-3">
                            <img src={props.post.image} alt="post image" className="img-fluid rounded"/>
                        </div>
                        {
                            userId == posterId ? (
                            <div className="mt-3">
                                <Link to={update_url} className="btn btn-sm btn-outline-success me-2">Edit</Link>
                                <button onClick={deleteHandler} className="btn btn-sm btn-outline-danger">Delete</button>
                            </div>):<div></div>
                        }
                        
                        <p className="card-text">{props.post.description}</p>
                    </div>
                </article>
                </div>
              </main>
        </>
    )
}