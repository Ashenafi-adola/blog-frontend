import './Style.css';

export default function CreatePost() {
  return (
    <>
      <div>
        <form method="post" enctype="multipart/form-data" class="post-form mx-auto">
          <div className="mt-3">
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" name="title" placeholder="Title..."/>
          </div>
          <div className="mt-3">
            <label htmlFor="content">Content:</label>
            <textarea name="content" id="content"></textarea>
          </div>
          <div>
            <label htmlFor="photo">Photo:</label>
            <input type="file" />
          </div>
          <img src="" alt="image" class="img-fluid rounded mt-2"/>  
          <div class="mt-3">
            <button type="submit" class="btn btn-primary"> POST</button>
          </div>
        </form>
      </div>
    </>
  );
}
