import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import About from "../src/Components/Home/About/About";
import Blogs from "../src/Components/Home/Blogs/Blogs";
import Contact from "../src/Components/Contact/Contact";
import Courses from "../src/Components/Home/Courses/Courses";
import Dashboard from "./Components/Dashboard/Dashboard/Dashboard";
import Home from "../src/Components/Home/Home/Home";
import Login from "./Components/Login/Login";
import NotFound from "./Components/NotFound/NotFound";
import Register from "./Components/Register/Register";
import Footer from "./Components/Shared/Footer/Footer";
import Header from "./Components/Shared/Header/Header";
import UserProfile from "./Components/UserProfile/UserProfile/UserProfile";
import SingleBlogMain from "./Components/Home/SingleBlog/SingleBlogMain";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/blog" element={<Blogs />} />
          <Route path="/singleblog" element={<SingleBlogMain />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/userProfile" element={<UserProfile />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
