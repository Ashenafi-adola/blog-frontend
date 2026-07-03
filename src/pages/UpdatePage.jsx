import { useState, useEffect } from "react";
import api from '../api/api';
import { useParams, useNavigate } from "react-router-dom";

export default function UpdatePage() {
    const [post, setPost] = useState({       
        title: "",
        image:null,
        description:""
    })

    const [preview, setPreview] = useState(null)

    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
      if (!id) return;
      api.get(`/posts/post-detail/${id}/`)
      .then((response)=>{
        const d = {
          title: response.data.title || "",
          image: response.data.image || null,
          description: response.data.description || "",
        }
        setPost(d)
        setPreview(d.image)
      }).catch((error)=>{
        console.error(error);
      })
    },[id])

    const titleChangeHandler = (e) => {
        setPost({
            ...post,
            title:e.target.value
        })
    }

    const descriptionChangeHandler = (e) =>{
        setPost({
            ...post,
            description: e.target.value
        })
    }

    const imageChangeHandler = (e) => {
        setPost({
            ...post,
            image: e.target.files[0]
        })
        setPreview(URL.createObjectURL(e.target.files[0]))
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
        const formData = new FormData();
        formData.append('title',post.title);
        formData.append('description', post.description);
        formData.append('image', post.image)
      await api.put(`/posts/post-detail/${id}/`, formData).catch((error) => {
        alert(error);
      });
      navigate('/home')
    
    };
  return (
    <>
      <div className="container page-split form-page">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <form onSubmit={handleSubmit} className="card shadow-sm">
              <div className="card-body p-4">
                <h4 className="card-title mb-3">Update Post</h4>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input id="title" type="text" value={post.title} onChange={titleChangeHandler} className="form-control" placeholder="Title..." />
                </div>
                <div className="mb-3">
                  <label htmlFor="content" className="form-label">Content</label>
                  <textarea id="content" name="content" rows={5} value={post.description} onChange={descriptionChangeHandler} className="form-control" placeholder="Update your post..." />
                </div>
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">Image</label>
                  <input id="image" type="file" files={post.image} onChange={imageChangeHandler} className="form-control"  name="image"/>
                </div>
                {preview ? (
                  <div className="mb-3">
                    <img src={preview} alt="preview" className="img-fluid img-thumbnail" style={{height:120, objectFit:'cover'}}/>
                  </div>
                ) : null}
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">Update</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
