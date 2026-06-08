export default function CommentList(props){
    return (
        <>
            <div className="bg-light p-3 rounded-3 shadow-sm">
                <small className="fw-semibold">@{props.fields.user}</small><br />
                <small className="small text-muted">{props.fields.commented_at.slice(0,10)}</small>
                <p className="mt-2">{props.fields.text}</p>
            </div>
            <div className="mt-3 d-flex gap-2">
                <a href="" className="btn btn-sm btn-outline-success">Edit</a>
                <a href="" className="btn btn-sm btn-outline-danger">Delete</a>
            </div>
        </>
    )
}