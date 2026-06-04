import CommentList from "./CommentList"


export default function CommentContainer(){
    return (
        <>
        <aside class="col-md-3 mb-4 order-3 order-md-3">
            <div class="card shadow-sm">
                <div class="card-body">
                    <h5 class="card-title">Comments</h5>
                    <form action="" method="post" class="mb-3">
                        <div class="d-grid">
                            <button class="btn btn-primary btn-sm mt-2">Comment</button>
                        </div>
                    </form>
                    <div class="comment-list">
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