import { Video, X } from "lucide-react";
import { useRef, useState } from "react";
import { VideoStore } from "../store/VideoStore";

function Post() {
  const [postForm, setPostForm] = useState({ title: "", description: "" });
  const [videoPreview, setVideoPreview] = useState(null);
  const videoRef = useRef(null);
  const dropRef = useRef(null);
  const { postVideo, isPosting } = VideoStore();

  const handleVideo = (file) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setVideoPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleVideo(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleVideo(file);
  };

  const removePreview = () => {
    setVideoPreview(null);
    if (videoRef.current) videoRef.current.value = "";
  };

  const handlePost = async () => {
    if (!postForm.title.trim() && !postForm.description.trim() && !videoPreview) return;

    try {
      const newForm = {
        title: postForm.title,
        description: postForm.description,
        video: videoPreview,
      };
      await postVideo(newForm);
      removePreview();
      setPostForm({ title: "", description: "" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 shadow-lg rounded-xl space-y-6">
      <div
        ref={dropRef}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="w-full h-48 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 transition cursor-pointer"
        onClick={() => videoRef.current?.click()}
      >
        {videoPreview ? (
          <div className="relative h-fit w-full max-w-md">
            <video src={videoPreview} controls className="rounded-lg h-[200px] w-full" />
            <button
              onClick={(e) => {
                e.stopPropagation();
                removePreview();
              }}
              className="absolute top-2 right-2 p-2 bg-white rounded-full shadow hover:bg-red-100"
            >
              <X className="text-red-500" />
            </button>
          </div>
        ) : (
          <>
            <Video className="w-10 h-10 mb-2" />
            <p>Drag and drop a video file here, or click to select</p>
          </>
        )}
        <input
          type="file"
          accept="video/*"
          ref={videoRef}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      <input
        type="text"
        name="title"
        value={postForm.title}
        placeholder="Title"
        onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <textarea
        name="description"
        value={postForm.description}
        placeholder="Write a short description..."
        rows="4"
        onChange={(e) => setPostForm({ ...postForm, description: e.target.value })}
        className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      ></textarea>

      <button
        onClick={handlePost}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
      >
        { isPosting ? "Posting..." : "Post" }
      </button>
    </div>
  );
}

export default Post;
