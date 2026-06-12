import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api, { ACCESS_TOKEN } from "../api/api";
import { jwtDecode } from 'jwt-decode'

export default function PostContent(props){
    const navigate = useNavigate();
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);

    const [like, setLike] = useState({
        post:0,
        user:[]
    })
    const [dislike, setDislike] = useState({
        post:0,
        user:[]
    })
    const [views, setViews] = useState(0);
    const [posterId, setPosterId] = useState(0);

    useEffect(()=>{
        api.get(`/accounts/get-user-id/${props.post.user}`)
        .then((response)=>{
            setPosterId(response.data.id)
        })
    },[])

    const {id} = useParams();
    const token = localStorage.getItem(ACCESS_TOKEN);

    let userId = null;
    if (token){
        userId = Number(jwtDecode(token).user_id);
    }

    useEffect(()=>{
        api.get(`/posts/views/${props.post.id}/`)
        .then((response)=>{
            setViews(response.data.user.length)
        }).catch((error)=>{
            alert(error)
        })

        api.get(`/posts/postlike/${id}/`)
        .then((res) =>{
            setLikes(res.data.user.length)
            setLike(res.data)
        }).catch((error)=>{
            console.log(error)
        })

        api.get(`/posts/postdislike/${id}/`)
        .then((res) =>{
            setDislikes(res.data.user.length)
            setDislike(res.data)
        }).catch((error)=>{
            console.log(error)
        })
    },[])

    const deleteHandler = () => {
        if(confirm("are you sure you want to delete the post?")){
            api.delete(`/posts/post-detail/${props.id}/`)
            navigate("/home")
        }
    }

    const likeHandler = async () => {
        await api.put(`/posts/postlike/${id}/`, like)
        .then((res)=>{
            setLikes(res.data.user.length)
            setLike(res.data)
        }).catch((error)=>{
            console.log(error)
        })
        await api.get(`/posts/postdislike/${id}/`)
        .then((res)=>{
            setDislike(res.data)
            setDislikes(res.data.user.length)
        })

    };

    const dislikeHandler = async () => {
        await api.put(`/posts/postdislike/${id}/`, dislike)
        .then((res)=>{
            setDislike(res.data)
            setDislikes(res.data.user.length)
        })
        .catch((error)=>{
            console.log(error)
        })
        await api.get(`/posts/postlike/${id}/`)
        .then((res)=>{
            setLike(res.data)
            setLikes(res.data.user.length)
        })

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
                                <div className="text-end">
                                    <button type="submit" onClick={likeHandler} name="like" className="btn btn-sm btn-outline-primary me-1">👍 {likes}</button>
                                    <button type="submit" onClick={dislikeHandler} name="dislike" className="btn btn-sm btn-outline-secondary">👎 {dislikes}</button>
                                    <div className="mt-2 text-muted small">{views}👁️</div>
                                </div>
                            
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