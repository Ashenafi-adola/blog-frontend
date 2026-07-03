import PostCard from "../components/PostCard";
import RecentContainer from "../components/RecentContainer";
import { useState, useEffect } from "react";
import api from "../api/api";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('')

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
  const searchHandler = (e) =>{
    setSearch(e.target.value);
  }
  return (
    <div className="content">
      <div className="container-fluid page-split">
        <div className="search-bar-wrapper">
          <div className="search-bar" role="search">
            <input
              onChange={searchHandler}
              className="form-control"
              type="search"
              placeholder="Search posts"
              aria-label="Search"
            />
            <button className="btn btn-primary" type="button">Search</button>
          </div>
        </div>
        <div className="row">
          <RecentContainer recents={posts} orderClass="order-2 order-lg-1"/>
          <main className="col-12 col-lg-9 order-1 order-lg-2">
            <div className="post-grid-scroll">
              <div className="row g-3">
                {
                  posts.map((post) => (
                    post.title.toLowerCase().includes(search.toLowerCase())?(
                    <div key={post.id} className="col-12 col-sm-6 col-xl-4">
                      <PostCard id={post.id} title={post.title} description={post.description} image={post.image} user={post.user}/>
                    </div>):null
                  ))
                }
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
