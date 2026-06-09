import { Link } from "react-router-dom";

export default function PostCard(props){
    return(
        <>
            <div className="card h-100 shadow-sm" style={{maxHeight: 420}}>
                <Link to={`/view-post/${props.id}`}>
                    <img src={props.image} className="card-img-top img-fluid" alt={props.title} style={{height: 220, objectFit: 'cover'}}/>
                </Link>
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title"><Link to={`/view-post/${props.id}`} className="text-decoration-none text-dark">{props.title}</Link></h5>
                    <p className="card-text text-muted small" style={{overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical'}}>
                      {props.description}
                    </p>
                </div>
                <div className="card-footer bg-white">
                    <small className="text-muted">@{props.user}</small>
                </div>
            </div>
        </>
    )
}