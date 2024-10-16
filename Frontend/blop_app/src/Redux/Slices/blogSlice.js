import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

export const registerUser = createAsyncThunk(
  "registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/register", userData);

      return response.data;
    } catch (error) {
      if (error.response.data.message && error.response.status === 400) {
        throw rejectWithValue("User Already Exist : please login");
      }
      throw error;
    }
  }
);

export const loginUser = createAsyncThunk(
  "loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/login", credentials);

      const token = response.data.token;
      console.log("JWT Token received:", token); 

   
      localStorage.setItem("token", token);

    
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      console.log("Decoded JWT:", decodedToken);  

      return {
        token,
        isAdmin: decodedToken.isAdmin, 
      };
    } catch (error) {
      console.log("Login API error response:", error.response);  
      if (error.response && error.response.status === 400) {
        return rejectWithValue("Invalid credentials");
      }
      throw error; 
    }
  }
);

 
export const viewAllPosts = createAsyncThunk(
  "viewAllPosts",
  async (_, { rejectWithValue }) => {   
    try {
      const response = await api.get("/posts/viewAllPosts");
      return response.data;  
    } catch (error) {
      if (error.response.data.message && error.response.status === 400) {
        throw rejectWithValue(error.response.data.message); 
      }
      throw error;
    }
  }
);


export const createBlog = createAsyncThunk(
  "createBlog",
  async (blogData, { rejectWithValue }) => {
    try {
      const response = await api.post("/posts/create-post", blogData);
      return response.data;  
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data.message);
      }
      throw error;
    }
  }
);

export const getPostById = createAsyncThunk(
  "getPostById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/posts/post-get-by-id/${id}`);

      return response.data;
    } catch (error) {
      if (error.response.data.message && error.response.status === 400) {
        throw rejectWithValue();
      }
      throw error;
    }
  }
);

export const updateBlogById = createAsyncThunk(
  "updateBlogById",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/posts/update-by-id/${id}`, updatedData);
      return response.data;  
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data.message);
      }
      throw error;
    }
  }
);


export const deleteBlogById = createAsyncThunk(
  "deleteBlogById",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/posts/delete-by-id/${id}`);
      return id;  
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data.message);
      }
      throw error;
    }
  }
);

const blogSlice = createSlice({
  name: "blogSlice",
  initialState: {
    isAdmin: false,
    token: null,
    posts: [],  
    loading: false,  
    error: null, 
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {})
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.isAdmin = action.payload.isAdmin;
      })
      .addCase(loginUser.rejected, (state, action) => {})
      .addCase(viewAllPosts.pending, (state) => {
        state.loading = true;  
        state.error = null;  
      })
      .addCase(viewAllPosts.fulfilled, (state, action) => {
        state.posts = action.payload;  
        state.loading = false;  
      })
      .addCase(viewAllPosts.rejected, (state, action) => {
        state.loading = false;  
        state.error = action.payload || "Failed to load posts";  
      })
    
      .addCase(createBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.posts.push(action.payload); 
        state.loading = false;
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create post";
      })

      // Handle updateBlogById actions
      .addCase(updateBlogById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBlogById.fulfilled, (state, action) => {
        const index = state.posts.findIndex(
          (post) => post._id === action.payload._id
        );
        if (index !== -1) {
          state.posts[index] = action.payload; // Update the post in the list
        }
        state.loading = false;
      })
      .addCase(updateBlogById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update post";
      })

      
      // Handle deleteBlogById actions
      .addCase(deleteBlogById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBlogById.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post._id !== action.payload); // Remove the deleted post
        state.loading = false;
      })
      .addCase(deleteBlogById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete post";
      });
      
  },
});
export default blogSlice.reducer;
