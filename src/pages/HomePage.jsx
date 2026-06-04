import PostCard from "../components/PostCard";
import RecentContainer from "../components/RecentContainer";
import './Style.css';

export default function HomePage() {
  return (
    <>
      <div className="content">
        <div className="container page-split">
          <div className="row">
            <RecentContainer />
            <main className="col-lg-9 order-1 order-lg-1">
              <PostCard />
              <PostCard />
              <PostCard />
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
