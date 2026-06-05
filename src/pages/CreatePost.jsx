
export default function CreatePost() {
  return (
    <>
      <div>
        <form method="post" encType="multipart/form-data" className="post-form mx-auto">
          <div className="mt-3">
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" name="title" className="form-control" placeholder="Title..." />
          </div>
          <div className="mt-3">
            <label htmlFor="content">Content:</label>
            <textarea name="content" id="content" className="form-control"></textarea>
          </div>
          <div className="mt-3">
            <label htmlFor="photo">Photo:</label>
            <input type="file" className="form-control" />
          </div>
          <img src="" alt="image" className="img-fluid rounded mt-3" />
          <div className="mt-4 text-end">
            <button type="submit" className="btn btn-primary px-4">POST</button>
          </div>
        </form>
      </div>
    </>
  );
}
