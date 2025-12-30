
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Auth from './pages/Auth';
import Services from './pages/Services';
import { Toaster } from 'sonner';

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/services" element={<Services />} />
          {/* Placeholder for future dashboards */}
          <Route path="/dashboard/student" element={<div className="pt-32 px-4 text-center">Student Dashboard Mockup</div>} />
          <Route path="/dashboard/teacher" element={<div className="pt-32 px-4 text-center">Teacher Dashboard Mockup</div>} />
          <Route path="/student-dashboard" element={<div className="pt-32 px-4 text-center">Student Dashboard Redirected</div>} />
          <Route path="/teacher-dashboard" element={<div className="pt-32 px-4 text-center">Teacher Dashboard Redirected</div>} />
        </Routes>
      </main>
      <Footer />
      <Toaster position="top-right" richColors />
    </div>
  );
};

export default App;
