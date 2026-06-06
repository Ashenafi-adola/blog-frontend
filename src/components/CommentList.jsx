


export default function CommentList({text}){
    return (
        <>
            <div className="comment-item mb-3">
                <div className="bg-light p-3 rounded-3 shadow-sm">
                    <div className="fw-semibold">@commentauthor</div>
                    <div className="small text-muted">just now</div>
                    <div className="mt-2">{text}</div>
                </div>
                <div className="mt-3 d-flex gap-2">
                    <a href="" className="btn btn-sm btn-outline-success">Edit</a>
                    <a href="" className="btn btn-sm btn-outline-danger">Delete</a>
                </div>
            </div>
        </>
    )
}