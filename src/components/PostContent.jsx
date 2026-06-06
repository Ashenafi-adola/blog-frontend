import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function PostContent(props){
    const navigate = useNavigate();
    const deleteHandler = () => {
        alert("are you sure you want to delete the post?")
        axios.delete(`http://127.0.0.1:8000/posts/post-detail/${props.id}/`)
        navigate("/home")
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
                                <form action="" method="get" className="d-inline">
                                    <button type="submit" name="action" value="like" className="btn btn-sm btn-outline-primary me-1">👍 4</button>
                                    <button type="submit" name="action" value="dislike" className="btn btn-sm btn-outline-secondary">👎 1</button>
                                </form>
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