import { Link } from "react-router-dom";
import image from "../assets/hero.png"

export default function PostCard(props){
    console.log(props.image)
    return(
        <>
            <div className="card h-100 shadow-sm">
                <Link to="/view-post">
                    <img src={props.image} className="card-img-top img-fluid" alt={props.title}/>
                </Link>
                <div className="card-body">
                    <h5 className="card-title"><Link to="/view-post" className="text-decoration-none text-dark">{props.title}</Link></h5>
                    <p className="card-text text-muted small">{props.description}</p>
                </div>
                <div className="card-footer bg-white">
                    <small className="text-muted">@postauthor</small>
                </div>
            </div>
        </>
    )
}