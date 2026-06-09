import { useState, useEffect } from "react";
import api from '../api/api';
import { useParams } from "react-router-dom";

export default function UpdatePage() {
    const [post, setPost] = useState({       
        title: "",
        image:null,
        description:""
    })

    const [preview, setPreview] = useState(null)

    const {id} = useParams();

    let data = {
        title:"",
        image:null,
        description:""
    }

    useEffect(()=>{
        api.get(`/posts/post-detail/${id}/`)
        .then((response)=>{
            data.title = response.data.title
            data.image = response.data.image;
            data.description = response.data.description;
            setPost(data)
            setPreview(data.image)
        }).catch((error)=>{
            console.error(error);
        })
    },[])

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
    
    };
  return (
    <>
      <div>
        <form onSubmit={handleSubmit} className="auth-form card" style={{width:400, alignSelf:"center"}}>
          <label htmlFor="title">Title:</label>
          <input type="text" value={post.title} onChange={titleChangeHandler} className="form-control" placeholder="Title..." />
          <label htmlFor="content">Content:</label>
          <textarea name="content" value={post.description} onChange={descriptionChangeHandler} className="form-control"></textarea>
          <label htmlFor="image">Image:</label>
          <input type="file" files={post.image} onChange={imageChangeHandler} className="form-control"  name="image"/>
          <img src={preview} alt="" style={{height:100}}/>
          <button type="submit">Update</button> 
        </form>
      </div>
    </>
  );
}
