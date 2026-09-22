import React, { useEffect, useState } from 'react'
import api from '../lib/axios';
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router';
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from 'lucide-react';

const CardDetailPage = () => {

  const [notes, setNotes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [save, setSave] = useState(false);

  const{id} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async() => {
      try {
        const res = await api.get(`/fashion/${id}`);
        setNotes(res.data);
      } catch (error) {
        console.log("error in fetching note: ", error);
        toast.error("Failed to fetch note")
        
      }finally{
        setLoading(false);
      }

    }
    fetchNote();
  }, [id])
  console.log({notes})

  const handleDelete =  async () => {
    if(!window.confirm("Are your sure you want to delete this note")) return;

        try {
            await api.delete(`/fashion/${id}`);
            toast.success("Note deleted succesfully");
            navigate("/");
        } catch (error) {
            console.log("error in deleting notes:", error);
            toast.error("Failed to delete note")
        }
  };

  const handleSave =  async () => {
    if(!notes.title.trim() || !notes.description.trim()){
      toast.success("Please add a title or content");
    }
    setSave(true);
    try {
      await api.put(`/fashion/${id}`,notes)
      navigate("/");
    } catch (error) {
      console.log("Error saving the note",error);
      toast.error("Failed to update the note");
    }finally{
      setSave(false);
    }

  }

   if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Notes
            </Link >
            <button onClick={handleDelete} className="btn btn-error btn-outline">
              <Trash2Icon className="h-5 w-5" />
              Delete Note
            </button>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note title"
                  className="input input-bordered"
                  value={notes.title}
                  onChange={(e) => setNotes({ ...notes, title: e.target.value })}
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered h-32"
                  value={notes.description}
                  onChange={(e) => setNotes({ ...notes, description: e.target.value })}
                />
              </div>

              <div className="card-actions justify-end">
                <button className="btn btn-primary" disabled={save} onClick={handleSave}>
                  {save ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardDetailPage