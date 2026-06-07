import RecentContainer from "../components/RecentContainer";
import PostContent from "../components/PostContent";
import CommentContainer from "../components/CommentContainer";
import api from "../api/api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ViewPost(){
    const [post, setPost] = useState(null);
    const [posts, setPosts] = useState([]);

    const {id} = useParams();

    useEffect(() => {
        api
        .get(`/posts/post-detail/${id}/`)
        .then((response) => {
            setPost(response.data);
            
        })
        .catch((error) =>{
            console.log(error);
        })
    },[]);

    useEffect(() => {
        api
        .get("/posts/home/")
        .then((response) => {
            setPosts(response.data);
        })
        .catch((error) => {
            console.error(error);
        });
    }, []);


    return (
        <>
        <div className="container page-split">
            <div className="row">
                <RecentContainer recents={posts}/>
                { post &&
                (<PostContent id={post.id} title={post.title} updated_at={post.updated_at} description={post.description} image={post.image}/>)
                }           
                <CommentContainer/>
            </div>
        </div>
        </>
    )
}