import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Contact from "./components/Contact";
import Home from "./components/Home";
import About from "./components/About";
import Partners from "./components/Partners";
// import Blogs from "./components/Blog/Blogs";
import ResourceLibrary from "./components/ResourceLibrary/ResourceLibrary";
import "./App.css";
import Team from "./components/Team/Team";
import Speakers from "./components/Speakers/Speakers";
import Login from "./components/User/Login";
import { gapi } from "gapi-script";
import TeamProfile from "./components/Team/TeamProfile";
import SpeakersProfile from "./components/Speakers/SpeakersProfile";
import ForgetPassword from "./components/User/forgotePassword";
import ContactForm from "./components/Contact Us Form/contactUsForm";
import ViewProfile from "./components/User/ViewProfile";
import User from "./components/Admin/User";
import AdminLogin from "./components/Admin/AdminLogin";
import ResourceLibraryProfile from "./components/ResourceLibrary/ResourceLibraryProfile";
import AddAdmin from "./components/Admin/AddAdmin";
// import BlogPage from "./components/Blog/BlogPage";
import PostBlogs from "./components/Blog/PostBlogs";
import ShowBlog from "./components/Blog/ShowBlog";
import MediaSection from "./components/Blog/BlogSection";
import Chatpp from "./components/Chatapp";
import UpdateBlog from "./components/Blog/UpdateBlog";
import AdminForgotPassword from "./components/Admin/AdminForgotPassword";
import Admin from "./components/Admin/AdminList";
import PersonalEvents from "./components/Event/PersonalEvents";
import EventsPage from "./components/Event/EventsPage";
import Events from "./components/Event/Events";
import EventRegistrationForm from "./components/Event/EventForm";
import EventEditForm from "./components/Event/EditEventForm";
const clientId =
  "574757039734-2hfvakv45d24o82mp3r80akqri2b70mq.apps.googleusercontent.com";

function App() {
  const AdminauthToken = localStorage.getItem("adminAuthToken");
  const isAdminAuthenticated = AdminauthToken !== null;

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    }
    gapi.load("client: auth2", start);
  });

  return (
    <div className="App">
      <Routes>
        {isAdminAuthenticated && (
          <>
            <Route path="/admin/add-admin" element={<AddAdmin />} />
            <Route path="/admin/user-list" element={<User />} />
            <Route path="/admin/admin-list" element={<Admin />} />
          </>
        )}
        <Route path="/login" element={<Login />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/adminforgotpassword" element={<AdminForgotPassword />} />
        <Route path="/" element={<Home />} />
        <>
          <Route path="/events" element={<Events />} />
          <Route path="/personal-events" element={<PersonalEvents />} />
          <Route
            path="/events/create-Event"
            element={<EventRegistrationForm />}
          />
          <Route path="/events/edit-Event/:id" element={<EventEditForm />} />
          <Route path="/event/details/:id" element={<EventsPage />} />
          <Route path="/profile" element={<ViewProfile />} />
          <Route path="/user" element={<User />} />
          <Route path="/user/reset-password" element={<ForgetPassword />} />
          <Route path="/contact-us/send-message" element={<ContactForm />} />
          <Route path="/team" element={<Team />} />
          <Route path="/team-member/details/:id" element={<TeamProfile />} />
          <Route path="/speakers" element={<Speakers />} />
          <Route path="/speaker/details/:id" element={<SpeakersProfile />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/chat" element={<Chatpp />} />
          <Route path="/resourceLibrary" element={<ResourceLibrary />} />
          <Route
            path="/project/details/:id"
            element={<ResourceLibraryProfile />}
          />
          <Route path="/blogs" element={<MediaSection />} />
          <Route path="/post-blogs" element={<PostBlogs />} />
          <Route path="/blogPage/:id" element={<ShowBlog />} />
          <Route path="/blog/update/:id" element={<UpdateBlog />} />
        </>
      </Routes>
    </div>
  );
}

export default App;
