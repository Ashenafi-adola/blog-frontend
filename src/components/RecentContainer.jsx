import RecentList from "./RecentList";

export default function RecentContainer(props){
    const posts = props.recents;
    return(
        <>
            <aside className="col-lg-3 mt-3 mt-lg-0 order-2 order-lg-2">
                <div className="card shadow-sm">
                    <div className="card-body">
                        <h5 className="card-title">Recent Blogs</h5>
                        <hr/>
                        <div className="overflow-auto" style={{maxHeight: 'calc(100vh - 120px)'}}>
                            <ul className="list-unstyled mb-0">
                                {
                                    posts.map((post) => (
                                        <RecentList key={post.id} post={post}/>
                                    ) )
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    )
}