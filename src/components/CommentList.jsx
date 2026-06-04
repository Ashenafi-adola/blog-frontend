


export default function CommentList(){
    return (
        <>
            <div class="comment-item mb-3">
                <div class="bg-light p-2 rounded">
                    <div class="fw-semibold">@commentauthor</div>
                    <div class="small text-muted">just now</div>
                    <div class="mt-1">the comment goes here</div>
                </div>
                <div class="mt-2">
                    <a href="" class="btn btn-sm btn-outline-success me-1">Edit</a>
                    <a href="" class="btn btn-sm btn-outline-danger">Delete</a>
                </div>
            </div>
        </>
    )
}