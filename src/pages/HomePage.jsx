import PostCard from "../components/PostCard";
import RecentContainer from "../components/RecentContainer";

export default function HomePage() {
  return (
    <>
      <div className="content">
        <div className="container page-split">
          <div className="row">
            <RecentContainer />
            <main className="col-lg-9 order-1 order-lg-1">
              <div className="row g-3">
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
