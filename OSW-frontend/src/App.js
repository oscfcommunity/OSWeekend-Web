import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { gapi } from "gapi-script";
import "./App.css";

// Grouped imports
import {
  Home,
  About,
  Partners,
  ResourceLibrary,
  Team,
  Speakers,
  Login,
  TeamProfile,
  SpeakersProfile,
  ForgetPassword,
  ContactForm,
  ViewProfile,
  User as AdminUser,
  AdminLogin,
  ResourceLibraryProfile,
  AddAdmin,
  PostBlogs,
  ShowBlog,
  MediaSection,
  Chatpp,
  UpdateBlog,
  AdminForgotPassword,
  Admin as AdminList,
  PersonalEvents,
  EventsPage,
  Events,
  EventRegistrationForm,
} from "./components";

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
        {isAdminAuthenticated ? (
          <>
            {/* Admin Routes */}
            <Route path="/admin/add-admin" element={<AddAdmin />} />
            <Route path="/admin/user-list" element={<AdminUser />} />
            <Route path="/admin/admin-list" element={<AdminList />} />
          </>
        ) : (
          // Non-admin Routes
          <>
            <Route path="/login" element={<Login />} />
            {/* ... other non-admin routes */}
          </>
        )}
        {/* Common Routes */}
        <Route path="/" element={<Home />} />
        {/* ... other common routes */}
      </Routes>
    </div>
  );
}

export default App;
