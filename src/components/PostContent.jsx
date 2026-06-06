import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function PostContent(props){
    const navigate = useNavigate();
    const [reaction, setReaction] = useState({
        likes:0,
        dislikes:0
    })
    const deleteHandler = () => {
        alert("are you sure you want to delete the post?")
        axios.delete(`http://127.0.0.1:8000/posts/post-detail/${props.id}/`)
        navigate("/home")
    }
    const {id} = useParams();
    useEffect(()=>{
        axios.get(`http://127.0.0.1:8000/posts/post-reaction/${id}/`)
        .then((response)=>{
            setReaction(response.data);
        }).catch((error) =>{
            console.log(error);
        })
    },[])

    const reactionHandler = (e) => {
        const likes = reaction.likes + 1;
        const dislikes = reaction.dislikes + 1;
        const data = {
            likes: reaction.likes,
            dislikes: reaction.dislikes 
        }
        if (e.target.name == 'like'){
            setReaction({
                ...reaction,
                likes: likes
            })
            data.likes = likes;
        }else{
            setReaction({
                ...reaction,
                dislikes: dislikes
            })
            data.dislikes = dislikes;
        }
        try{
            axios.put(`http://127.0.0.1:8000/posts/post-reaction/${id}/`, data);
        }
        catch(error){
            console.log(error);
        }
    }

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
                                <button onClick={reactionHandler} name="like" className="btn btn-sm btn-outline-primary me-1">👍 {reaction.likes}</button>
                                <button onClick={reactionHandler} name="action" value="dislike" className="btn btn-sm btn-outline-secondary">👎 {reaction.dislikes}</button>
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