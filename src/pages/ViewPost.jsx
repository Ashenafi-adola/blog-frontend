import RecentContainer from "../components/RecentContainer";
import PostContent from "../components/PostContent";
import CommentContainer from "../components/CommentContainer";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ViewPost(){
    const [post, setPost] = useState(null);
    const [posts, setPosts] = useState([]);

    const {id} = useParams();

    useEffect(() => {
        axios
        .get(`http://127.0.0.1:8000/posts/post-detail/${id}/`)
        .then((response) => {
            setPost(response.data);
            console.log(response.data)
        })
        .catch((error) =>{
            console.log(error);
        })
    },[]);

    useEffect(() => {
        axios
        .get("http://127.0.0.1:8000/posts/home/")
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