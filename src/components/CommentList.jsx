


export default function CommentList({text, date}){
  
    return (
        <>
            <div className="bg-light p-3 rounded-3 shadow-sm">
                <small className="fw-semibold">@commentauthor</small><br />
                <small className="small text-muted">{date.slice(0,10)}</small>
                <p className="mt-2">{text}</p>
            </div>
            <div className="mt-3 d-flex gap-2">
                <a href="" className="btn btn-sm btn-outline-success">Edit</a>
                <a href="" className="btn btn-sm btn-outline-danger">Delete</a>
            </div>
        </>
    )
}