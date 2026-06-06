import { Link } from "react-router-dom"

export default function RecentList(props){
    return (
        <>
        <li className="d-flex mb-3">
            <Link to={`/view-post/${props.post.id}`} className="d-flex text-decoration-none text-dark w-100">
                <img src={props.post.image} alt="" className="rounded-circle me-2" width="48" height="48"/>
                <div>
                    <div className="fw-bold">{props.post.title}</div>
                    <small className="text-muted">@postauthor - </small>
                </div>
            </Link>
        </li>
        </>
    )
}