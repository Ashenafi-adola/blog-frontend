import RecentList from "./RecentList";

export default function RecentContainer(){
    return(
        <>
            <aside className="col-lg-3 mt-3 mt-lg-0 order-2 order-lg-2">
                <div className="card shadow-sm">
                    <div className="card-body">
                        <h5 className="card-title">Recent Blogs</h5>
                        <hr/>
                        <ul className="list-unstyled mb-0">
                            <RecentList/>
                            <RecentList/>
                            <RecentList/>
                            <RecentList/>
                            <RecentList/>
                        </ul>
                    </div>
                </div>
            </aside>
        </>
    )
}