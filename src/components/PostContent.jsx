import { Link } from "react-router-dom"

export default function PostContent(){
    return (
        <>
            <main className="col-md-6 mb-4 order-2 order-md-2">
                <article className="card shadow-sm">
                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                            <div>
                                <h4 className="card-title mb-0">posttitle</h4>
                                <small className="text-muted">posted by @postauthor · pub date</small>
                            </div>
                            <div className="text-end">
                                <form action="" method="get" className="d-inline">
                                    <button type="submit" name="action" value="like" className="btn btn-sm btn-outline-primary me-1">👍 4</button>
                                    <button type="submit" name="action" value="dislike" className="btn btn-sm btn-outline-secondary">👎 1</button>
                                </form>
                                <div className="mt-2 text-muted small">Views 👁️ 13</div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <img src="" alt="post image" className="img-fluid rounded"/>
                        </div>
                        <p className="card-text">the main content goes here</p>
                        <div className="mt-3">
                            <Link to="" className="btn btn-sm btn-outline-success me-2">Edit</Link>
                            <Link to="" className="btn btn-sm btn-outline-danger">Delete</Link>
                        </div>
                    </div>
                </article>
            </main>
        </>
    )
}