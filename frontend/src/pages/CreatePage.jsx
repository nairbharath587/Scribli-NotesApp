import { Link, useLocation, useNavigate } from 'react-router'
import React from 'react'
import { useState } from 'react'
import { ArrowLeftIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../lib/axios';

const CreatePage = () => {
  const location = useLocation();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState(location.state?.content || "");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault() //to stop refreshing

    if(!title.trim() || !content.trim()){
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await api.post("/fashion", {
        title: title,
        description: content
      })
      toast.success("Success creating note");
      navigate("/")
    } catch (error) {
      console.log("error creating note", error);
      if(error.response.status === 429){
        toast.error("Slow down! you are creating note way too fast!", {
          duration:4000,
          icon:"💀",
        });
      }else {
        toast.error("Failed to create note");
      }
    }finally{
      setLoading(false);
    }

  }
  
  return (
    <div className='min h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <Link to ={"/"} className= "btn btn-primary"> 
          <ArrowLeftIcon className='size-5'/>
          Back to Notes
        </Link>
      </div>

      <div className="card bg-base-100">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4"> Create New notes</h2>
          <form onSubmit={handleSubmit}>
            <div className='form-control mb-4'>
              <label className="label">
                <span className='label-text'>Title</span>
              </label>
              <input type = "text"
                placeholder="Note Title"
                className='input input-boredered'
                value ={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className='form-control mb-4'>
              <label className="label">
                <span className='label-text'>Content</span>
              </label>
              <input type = "text"
                placeholder="Write your note here.."
                className='input input-boredered'
                value ={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
             <div className="card-actions justify-end">
            <button type="submit" className= "btn btn-primary" disabled ={loading}> {/* disables when it is in loading state*/}
              {loading ? "Creating..": "Create Note"}
              
            </button>
          </div>
          </form>
        </div>

      </div>
      
    
    </div>
  )
}

export default CreatePage