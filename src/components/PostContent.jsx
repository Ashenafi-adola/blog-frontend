import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api, { ACCESS_TOKEN } from "../api/api";
import { jwtDecode } from 'jwt-decode'

export default function PostContent(props){
    const navigate = useNavigate();

    const [postData, setPostData] = useState({
        views: 0,
        likes: 0,
        dislikes: 0
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

    let userId = null;
    if (token){
        userId = Number(jwtDecode(token).user_id);
    }

    useEffect(()=>{
        api.get(`/posts/post-detail/${props.post.id}`)
        .then((res)=>{
            setPostData(res.data)
            console.log(res.data)
        })
        .catch((error)=>{
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
        await api.like(`/posts/post-detail/${id}/`)
        .then((res)=>{
            setPostData({
                ...postData,
                likes: res.data.user.length
            })
        }).catch((error)=>{
            console.log(error)
        })
        await api.get(`/posts/post-detail/${id}/`)
        .then((res)=>{
            setPostData(res.data)
        })
    };

    const dislikeHandler = async () => {
        await api.dislike(`/posts/post-detail/${id}/`)
        .then((res)=>{
            setPostData({
                ...postData,
                dislikes: res.data.user.length
            })
        })
        .catch((error)=>{
            console.log(error)
        })
        
        await api.get(`/posts/post-detail/${id}/`)
        .then((res)=>{
            setPostData(res.data)
        })
    };

    const dateString = props.post.updated_at;
    const date = new Date(dateString).toDateString();
    const update_url = `/update-post/${id}`

    return (
        <>
          <main className="col-12 col-lg-6 order-1 order-lg-2">
              <div className="main-scroll">
              <article className="card shadow-sm">
                <div className="card-body">
                        <div className="post-header mb-2">
                            <div className="post-header-meta">
                                <h4 className="card-title mb-0">{props.post.title}</h4>
                                <small>@{props.post.user}</small><br />
                                <small className="text-muted">{date}</small>
                            </div>
                                <div className="post-header-actions">
                                    <button type="submit" onClick={likeHandler} name="like" className="btn btn-sm btn-outline-primary">👍 {postData.likes}</button>
                                    <button type="submit" onClick={dislikeHandler} name="dislike" className="btn btn-sm btn-outline-secondary">👎 {postData.dislikes}</button>
                                    <div className="mt-2 text-muted small">{postData.views}👁️</div>
                                </div>
                        </div>
                        <div className="mb-3">
                            <img src={`https://blog-api-1-dbyq.onrender.com/${props.post.image}`} alt="post image" className="img-fluid rounded"/>
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