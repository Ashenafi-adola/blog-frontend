import { useState } from "react";
import api from '../api/api';
import { Navigate, useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [formData, setFormData] = useState({
    title: "",
    description : "",
    image: null
  });

  const navigate = useNavigate()

  const [imagePreview, setImagePreview] = useState(null);

  const titleChangeHandler = (e) => {
    setFormData({
      ...formData,
      title: e.target.value
    })
  }
  const descriptionChangeHandler = (e) => {
    setFormData({
      ...formData,
      description: e.target.value
    })
  }
  const imageChangeHandler = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0]
    })
    setImagePreview(URL.createObjectURL(e.target.files[0]))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('image', formData.image);
    try{
      await api.post("/posts/create-post/", data);
    } catch(error){
      console.error(error);
    }finally{
      navigate('/home')
    }
  }

  return (
    <>
      <div className="container page-split form-page">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <form onSubmit={handleSubmit} className="card shadow-sm">
              <div className="card-body p-4">
                <h4 className="card-title mb-3">Create Post</h4>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input id="title" type="text" onChange={titleChangeHandler} className="form-control" placeholder="Title..." />
                </div>
                <div className="mb-3">
                  <label htmlFor="content" className="form-label">Content</label>
                  <textarea id="content" name="content" rows="5" onChange={descriptionChangeHandler} className="form-control" placeholder="Write your post..." />
                </div>
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">Image</label>
                  <input id="image" type="file" className="form-control" onChange={imageChangeHandler} name="image"/>
                </div>
                {imagePreview ? (
                  <div className="mb-3">
                    <img src={imagePreview} alt="preview" className="img-fluid img-thumbnail" style={{height:120, objectFit:'cover'}}/>
                  </div>
                ) : null}
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">POST</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
