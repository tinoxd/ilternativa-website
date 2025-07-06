import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './styles.css';
import './styles/design-system-pro.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

import NavbarPro from "./components/NavbarPro.js"
import HomePro from "./components/HomePro.js";
import EventsList from "./components/EventsList.js";
import CreateEvent from "./components/CreateEvent.js";
import EditEvent from "./components/EditEvent.js";
import FooterPro from "./components/FooterPro.js";
import About from "./components/About.js";
import Contact from "./components/Contact.js";
import Login from "./components/Login.js";
import AdminDashboard from "./components/AdminDashboard.js";
import AdminSetup from "./components/AdminSetup.js";
import PrivateRoute from "./components/PrivateRoute.js";
import EventRegistrationForm from "./components/EventRegistrationForm.js";
import VideosPage from "./components/VideosPage.js";
import EmbeddedVideos from "./components/EmbeddedVideos.js";
import Schedule from "./components/Schedule.js";
import Gallery from "./components/Gallery.js";
import WhatsAppButton from "./components/WhatsAppButton.js";

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <NavbarPro />
        <main className="flex-grow-1" style={{ paddingTop: '70px' }}>
          <Routes>
            <Route path="/" exact element={<HomePro />} />
            <Route path="/events" element={<EventsList />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/videos" element={<VideosPage />} />
            <Route path="/videos/embed" element={<EmbeddedVideos />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin-setup" element={<AdminSetup />} />
            <Route path="/register-event/:eventId" element={<EventRegistrationForm />} />
            <Route path="/admin" element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            } />
            <Route path="/create" element={
              <PrivateRoute>
                <CreateEvent />
              </PrivateRoute>
            } />
            <Route path="/edit/:id" element={
              <PrivateRoute>
                <EditEvent />
              </PrivateRoute>
            } />
          </Routes>
        </main>
        <FooterPro />
        <WhatsAppButton />
      </div>
    </Router>
  );
}

export default App;
