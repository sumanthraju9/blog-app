import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import { useBlogStore } from "../store/blogStore";

const SingleBlog = () => {
  const [data, setData] = useState(null);
  const [image, setImage] = useState("");

  const { blogId } = useParams();
  const { fetchBlogById, loading, error } = useBlogStore();

  useEffect(() => {
    const loadBlog = async () => {
      const blog = await fetchBlogById(blogId);
      if (blog) {
        setData(blog);
        setImage(blog.image);
      }
    };
    loadBlog();
  }, [blogId, fetchBlogById]);

  return (
    <>
      <Navbar />
      <div className="single-blog px-[100px] mt-4">
        <div className="flex w-full min-h-[400px] pt-5">
          <div className="w-[40%] h-full">
            {image && (
              <img
                className="w-full h-[280px] rounded-lg object-cover"
                src={`http://localhost:3000/uploads/${image}`}
                alt={data ? data.title : "Blog image"}
              />
            )}
          </div>

          <div className="w-[60%] pl-6 flex flex-col justify-center">
            {loading && (
              <p className="text-[gray] text-[14px] mb-2">Loading blog...</p>
            )}
            {error && (
              <p className="text-[14px] text-red-500 mt-1 mb-3">{error}</p>
            )}
            <h2 className="text-3xl font-semibold mb-2">
              {data ? data.title : ""}
            </h2>
            <p className="text-[gray] text-[14px]">
              {data ? data.desc : ""}
            </p>
          </div>
        </div>

        <div className="mt-6">
          {data && data.content ? parse(data.content) : null}
        </div>
      </div>
    </>
  );
};

export default SingleBlog;
