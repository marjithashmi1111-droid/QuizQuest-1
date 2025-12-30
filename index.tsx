import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import RootLayout from './app/layout';
import Home from './app/page';
import Auth from './app/auth/page';
import About from './app/about/page';
import Contact from './app/contact/page';
import Services from './app/services/page';
import CreateQuiz from './app/teacher/create-quiz/page';
import MyQuizzes from './app/teacher/my-quizzes/page';
import QuizPlayer from './app/quiz/[id]/page';
import StudentDashboard from './app/student/dashboard/page';
import TeacherDashboard from './app/teacher/dashboard/page';
import ConnectionRequests from './app/teacher/connection-requests/page';
import FindTeachers from './app/student/find-teachers/page';
import StudentResults from './app/student/results/page';
import TeacherReports from './app/teacher/reports/page';
import TeacherQuizReport from './app/teacher/quiz-report/page';
import TeacherSettings from './app/teacher/settings/page';
import TeacherQuizAccess from './app/teacher/quiz-access/page';

const App = () => (
  <RootLayout>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/services" element={<Services />} />
      
      {/* Teacher Routes */}
      <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
      <Route path="/create-quiz" element={<CreateQuiz />} />
      <Route path="/teacher/my-quizzes" element={<MyQuizzes />} />
      <Route path="/connection-requests" element={<ConnectionRequests />} />
      <Route path="/teacher/reports" element={<TeacherReports />} />
      <Route path="/teacher/quiz-report/:quizId" element={<TeacherQuizReport />} />
      <Route path="/teacher/settings" element={<TeacherSettings />} />
      <Route path="/teacher/quiz-access/:quizId" element={<TeacherQuizAccess />} />

      {/* Student Routes */}
      <Route path="/student-dashboard" element={<StudentDashboard />} />
      <Route path="/find-teachers" element={<FindTeachers />} />
      <Route path="/my-results" element={<StudentResults />} />
      
      {/* Quiz Player */}
      <Route path="/quiz/:id" element={<QuizPlayer />} />
    </Routes>
  </RootLayout>
);

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <HashRouter>
      <App />
    </HashRouter>
  );
}
