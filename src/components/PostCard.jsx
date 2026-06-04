export default function PostCard(){
    return(
        <>
            <div className="col-sm-6 col-lg-4">
                <div className="card h-100 shadow-sm">
                    <a href="">
                        <img src="" className="card-img-top img-fluid" alt="post title"/>
                    </a>
                    <div className="card-body">
                        <h5 className="card-title"><a href="{% url 'viewpost' post.id %}" className="text-decoration-none text-dark">post title</a></h5>
                        <p className="card-text text-muted small">post content</p>
                    </div>
                    <div className="card-footer bg-white">
                        <small className="text-muted">@postauthor</small>
                    </div>
                </div>
            </div>
        </>
    )
}