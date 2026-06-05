import CommentList from "./CommentList"


export default function CommentContainer(){
    return (
        <>
        <aside className="col-md-3 mb-4 order-3 order-md-3">
            <div className="card shadow-sm">
                <div className="card-body">
                    <h5 className="card-title">Comments</h5>
                    <form action="" method="post" className="mb-3">
                        <div className="d-grid">
                            <button className="btn btn-primary btn-sm mt-2">Comment</button>
                        </div>
                    </form>
                    <div className="comment-list">
                        <CommentList/>
                        <CommentList/>
                        <CommentList/>
                        <CommentList/>
                        <CommentList/>
                        <CommentList/>
                        <CommentList/>
                    </div>
                </div>
            </div>
        </aside>
        </>
    )
}