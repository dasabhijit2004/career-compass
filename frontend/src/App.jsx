import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Strength from './components/Strength';
import WorkStyleQuestion from './components/WorkStyleQuestions';
import WorkEnvironmentPreferences from './components/WrokEnvironment';
import ValuesPrioritiesQuiz from './components/Values';
import Education from './components/Education';
import Lifestyle from './components/Lifestyle';
import LongTerm from './components/LongTerm';
import Interest from './components/Interest';
import Home from './pages/Home';
import AuthPage from './components/AuthPage';
import ResumeGenerator from './pages/Resume';
import MarkdownToPDF from './pages/Result';
import CareerCompassNavbar from './components/Navbar';
import Footer from './components/Footer';
import JobKeyMatcher from './pages/Jobkey';
import Profile from './pages/Profile';
import Pricing from "./pages/Pricing"; // adjust path as needed

function App() {
  return (
    <Router>
      <CareerCompassNavbar />
      <Routes>
        <Route path="/login" element={<AuthPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<MarkdownToPDF />} />
        <Route path="/resume-generation" element={<ResumeGenerator />} />
        <Route path="/quiz" element={<Interest />} />
        <Route path="/strength" element={<Strength />} />
        <Route path="/workstyle" element={<WorkStyleQuestion />} />
        <Route path="/workenv" element={<WorkEnvironmentPreferences />} />
        <Route path="/values" element={<ValuesPrioritiesQuiz />} />
        <Route path="/education" element={<Education />} />
        <Route path="/lifestyle" element={<Lifestyle />} />
        <Route path="/longterm" element={<LongTerm />} />
        <Route path="/jobkey" element={<JobKeyMatcher />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/pricing" element={<Pricing />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
