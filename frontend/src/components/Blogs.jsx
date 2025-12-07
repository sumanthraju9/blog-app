import React, { useEffect } from "react";
import Blog from "./Blog";
import { useBlogStore } from "../store/blogStore";

const Blogs = () => {
  const { blogs, fetchBlogs, loading, error } = useBlogStore();

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return (
    <>
      <div className="blogs px-[100px] mt-4 mb-5">
        <h3 className="text-2xl">Latest Blogs</h3>

        <div className="blogsCon">
          {loading && <p className="text-[gray] text-[14px]">Loading blogs...</p>}
          {error && (
            <p className="text-[14px] text-red-500 mt-1 mb-3">{error}</p>
          )}
          {!loading && !error && blogs && blogs.length === 0 && (
            <p>No Blogs Found !</p>
          )}
          {!loading &&
            !error &&
            blogs &&
            blogs.map((item, index) => (
              <Blog key={item._id || index} data={item} />
            ))}
        </div>
      </div>
    </>
  );
};

export default Blogs;
