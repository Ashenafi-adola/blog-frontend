import PostCard from "../components/PostCard";
import RecentContainer from "../components/RecentContainer";
import { useState, useEffect } from "react";
import api from "../api/api";
import { Link } from "react-router-dom";

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
    <>
      <div className="content">
        <div className="container page-split">
        <div className="d-flex col-lg-4 p-3" role="search">
            <input onChange={searchHandler} className="form-control form-control-sm me-2" type="search" placeholder="Search posts" aria-label="Search" />
            <button className="btn btn-sm btn-light" type="submit">Search</button>
        </div>
          <div className="row">
            <RecentContainer recents={posts}/>
            <main className="col-lg-9 order-1 order-lg-1">
              <div className="overflow-auto" style={{maxHeight: 'calc(100vh - 120px)'}}>
                <div className="row g-3">
                  {
                    posts.map((post) => (
                      post.title.toLowerCase().includes(search.toLowerCase())?(
                      <div key={post.id} className="col-sm-6 col-lg-4">
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
    </>
  );
}
