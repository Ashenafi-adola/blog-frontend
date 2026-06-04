import RecentContainer from "../components/RecentContainer";
import PostContent from "../components/PostContent";


export default function ViewPost(){
    return (
        <>
        <div className="container page-split">
            <div className="row">
                <RecentContainer/>
                <PostContent/>
                
            </div>
        </div>
        </>
    )
}