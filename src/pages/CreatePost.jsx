import { useState } from "react";
import axios from 'axios';

export default function CreatePost() {
  const [formData, setFormData] = useState({
    title: "",
    description : "",
    image: null
  });

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
      await axios.post("http://127.0.0.1:8000/posts/create-post/", data);
    } catch(error){
      console.error(error);
    }
  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title:</label>
          <input type="text" onChange={titleChangeHandler} className="form-control" placeholder="Title..." />
          <label htmlFor="content">Content:</label>
          <textarea name="content" onChange={descriptionChangeHandler} className="form-control"></textarea>
          <label htmlFor="image">Image:</label>
          <input type="file" className="form-control" onChange={imageChangeHandler} name="image"/>
          <img src={imagePreview} alt="" style={{height:100}}/>
          <button type="submit">POST</button> 
        </form>
      </div>
    </>
  );
}
