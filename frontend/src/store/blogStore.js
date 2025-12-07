import { create } from "zustand";
import api from "../api/client";

export const useBlogStore = create((set, get) => ({
  blogs: [],
  currentBlog: null,
  loading: false,
  error: null,

  clearError: () => set({ error: null }),

  fetchBlogs: async () => {
    set({ loading: true, error: null });
    try {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("token")
          : null;

      const { data } = await api.post("/getBlogs", { token });

      if (data.success) {
        set({ blogs: data.blogs, loading: false });
      } else {
        set({
          loading: false,
          error: data.msg || "Failed to load blogs",
        });
      }
    } catch (err) {
      const msg =
        err.response?.data?.msg ||
        err.message ||
        "Something went wrong while fetching blogs";
      set({ loading: false, error: msg });
    }
  },

  fetchBlogById: async (blogId) => {
    set({ loading: true, error: null });
    try {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("token")
          : null;

      const { data } = await api.post("/getBlog", {
        blogId,
        token,
      });

      if (data.success) {
        set({ currentBlog: data.blog, loading: false });
        return data.blog;
      }

      set({
        loading: false,
        error: data.msg || "Failed to fetch blog",
      });
      return null;
    } catch (err) {
      const msg =
        err.response?.data?.msg ||
        err.message ||
        "Something went wrong while fetching blog";
      set({ loading: false, error: msg });
      return null;
    }
  },

  createBlog: async (formData) => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.post("/uploadBlog", formData, {
        headers: {
         
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        set({ loading: false });
       
        const fetchBlogs = get().fetchBlogs;
        if (fetchBlogs) {
          fetchBlogs();
        }
        return { success: true, msg: data.msg };
      }

      set({
        loading: false,
        error: data.msg || "Failed to create blog",
      });
      return { success: false, msg: data.msg };
    } catch (err) {
      const msg =
        err.response?.data?.msg ||
        err.message ||
        "Something went wrong while creating blog";
      set({ loading: false, error: msg });
      return { success: false, msg };
    }
  },
}));
