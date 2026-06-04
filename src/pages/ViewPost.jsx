import RecentContainer from "../components/RecentContainer";
import PostContent from "../components/PostContent";
import CommentContainer from "../components/CommentContainer";

export default function ViewPost(){
    return (
        <>
        <div className="container page-split">
            <div className="row">
                <RecentContainer/>
                <PostContent/>
                <CommentContainer/>
            </div>
        </div>
        </>
    )
}