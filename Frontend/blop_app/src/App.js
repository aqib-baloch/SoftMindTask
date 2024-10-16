import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginForm from "./pages/LogInForm";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import BlogPage from "./pages/Blog";
import BlogDetails from "./pages/BlogDetails";
import CreateBlogForm from "./pages/BlogForm";
import EditBlogPage from "./pages/EditBlogPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blogDetails/:id" element={<BlogDetails />} />
        <Route path="/createBlog" element={<CreateBlogForm />} />
        <Route path="/editBlog/:id" element={<EditBlogPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
