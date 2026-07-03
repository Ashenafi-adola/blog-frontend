import RecentList from "./RecentList";

export default function RecentContainer({ recents, orderClass = "order-3 order-lg-1" }){
    const posts = recents;
    return(
        <aside className={`col-lg-3 sidebar-panel d-none d-lg-block ${orderClass}`}>
            <div className="card shadow-sm">
                <div className="card-body">
                    <h5 className="card-title">Recent Blogs</h5>
                    <hr/>
                    <div className="sidebar-scroll">
                        <ul className="list-unstyled mb-0">
                            {
                                posts.map((post) => (
                                    <RecentList key={post.id} post={post}/>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </aside>
    )
}
