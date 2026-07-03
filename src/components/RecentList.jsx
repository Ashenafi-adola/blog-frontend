import { Link } from "react-router-dom"

export default function RecentList(props){
    return (
        <li className="mb-1">
            <Link to={`/tunel/${props.post.id}`} className="recent-item-link">
                <img
                    src={props.post.image}
                    alt=""
                    className="recent-item-thumb"
                />
                <div className="recent-item-text">
                    <div className="recent-item-title font-semibold">{props.post.title}</div>
                    <small className="recent-item-meta">@{props.post.user}</small>
                </div>
            </Link>
        </li>
    )
}
