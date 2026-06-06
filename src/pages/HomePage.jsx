import PostCard from "../components/PostCard";
import RecentContainer from "../components/RecentContainer";
import { useState, useEffect } from "react";
import axios from 'axios'

export default function HomePage() {
  const [posts, setPosts] = useState([]);

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
      <div className="content">
        <div className="container page-split">
          <div className="row">
            <RecentContainer recents={posts}/>
            <main className="col-lg-9 order-1 order-lg-1">
              <div className="row g-3">
                {
                  posts.map((post) => (
                    <div key={post.id} className="col-sm-6 col-lg-4">
                      <PostCard id={post.id} title={post.title} description={post.description} image={post.image} />
                    </div>
                  ))
                }
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
