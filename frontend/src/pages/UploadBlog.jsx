import React, { useRef, useState } from "react";
import Navbar from "../components/Navbar";
import JoditEditor from "jodit-react";
import { useBlogStore } from "../store/blogStore";

const UploadBlog = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminSecret, setAdminSecret] = useState("");
  const [localError, setLocalError] = useState("");

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");

  const editor = useRef(null);
  const [content, setContent] = useState("");

  const { createBlog, loading, error: blogError, clearError } = useBlogStore();

  const checkAdmin = () => {
    setLocalError("");
    if (adminSecret !== "") {
      if (adminSecret === "admin1234") {
        setIsAdmin(true);
      } else {
        setLocalError("Invalid admin secret !");
      }
    } else {
      setLocalError("Please provide admin secret !");
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    clearError();
    setLocalError("");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("content", content);
    formData.append("image", image);
    formData.append("token", localStorage.getItem("token"));

    const result = await createBlog(formData);

    if (result.success) {
      alert("Blog created successfully");
      setTitle("");
      setDesc("");
      setContent("");
      setImage("");
    } else if (result.msg) {
      setLocalError(result.msg);
    }
  };

  return (
    <>
      <Navbar />
      {isAdmin === false ? (
        <>
          <div className="con flex items-center justify-center flex-col h-screen">
            <div className="w-[25vw] h-[fit] flex flex-col rounded-xl p-[20px] bg-[#0F0E0E]">
              <h3 className="text-2xl mb-4">Login to upload blog</h3>

              <div className="inputBox">
                <input
                  onChange={(e) => setAdminSecret(e.target.value)}
                  value={adminSecret}
                  type="text"
                  placeholder="Enter admin secret"
                />
              </div>

              {(localError || blogError) && (
                <p className="text-red-500 text-[13px] mt-2">
                  {localError || blogError}
                </p>
              )}

              <button className="btnNormal mt-3" onClick={checkAdmin}>
                Login
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="px-[100px] mt-4 mb-5">
            <h3 className="text-2xl mb-4">Create Blog</h3>
            <form
              onSubmit={submitForm}
              className="w-full flex flex-col gap-3 bg-[#0F0E0E] p-5 rounded-xl"
            >
              <div className="flex gap-4">
                <div className="flex-1">
                  <p className="text-[gray] text-[14px]">Title</p>
                  <div className="inputBox">
                    <input
                      type="text"
                      placeholder="Enter blog title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-[gray] text-[14px]">Short Description</p>
                  <div className="inputBox">
                    <input
                      type="text"
                      placeholder="Enter short description"
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="mt-3">
                <p className="text-[gray] text-[14px] mb-2">Content</p>
                <JoditEditor
                  ref={editor}
                  value={content}
                  onChange={(newContent) => setContent(newContent)}
                />
              </div>

              <div className="mt-3">
                <p className="text-[gray] text-[14px] mb-2">Featured Image</p>
                <input
                  type="file"
                  className="my-1"
                  onChange={(e) => setImage(e.target.files[0])}
                  id="file"
                  required
                />
              </div>

              {(localError || blogError) && (
                <p className="text-red-500 text-[13px] mt-2">
                  {localError || blogError}
                </p>
              )}

              <button
                type="submit"
                className="btnNormal mt-3"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Blog"}
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default UploadBlog;
