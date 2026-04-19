import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import PublicLayout from './components/PublicLayout';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/DashboardLayout';
import LoadingScreen from './components/LoadingScreen';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import BlogsPage from './pages/BlogsPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import SmartMandiFinderPage from './pages/SmartMandiFinderPage';
import DashboardHomePage from './pages/DashboardHomePage';
import MandiAnalysisPage from './pages/MandiAnalysisPage';
import HistoryPage from './pages/HistoryPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';

const PageTransition = ({ children }) => {
  return <div className="page-enter">{children}</div>;
};

function App() {
  const [showLoader, setShowLoader] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 2600);

    return () => clearTimeout(timer);
  }, []);

  if (showLoader) {
    return <LoadingScreen />;
  }

  return (
    <Routes location={location} key={location.pathname}>
      <Route element={<PublicLayout />}>
        <Route
          path="/"
          element={
            <PageTransition>
              <HomePage />
            </PageTransition>
          }
        />
        <Route
          path="/about"
          element={
            <PageTransition>
              <AboutPage />
            </PageTransition>
          }
        />
        <Route
          path="/blogs"
          element={
            <PageTransition>
              <BlogsPage />
            </PageTransition>
          }
        />
        <Route
          path="/contact"
          element={
            <PageTransition>
              <ContactPage />
            </PageTransition>
          }
        />
        <Route
          path="/login"
          element={
            <PageTransition>
              <LoginPage />
            </PageTransition>
          }
        />
        <Route
          path="/signup"
          element={
            <PageTransition>
              <SignupPage />
            </PageTransition>
          }
        />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route
            index
            element={
              <PageTransition>
                <DashboardHomePage />
              </PageTransition>
            }
          />
          <Route
            path="analysis"
            element={
              <PageTransition>
                <MandiAnalysisPage />
              </PageTransition>
            }
          />
          <Route
            path="history"
            element={
              <PageTransition>
                <HistoryPage />
              </PageTransition>
            }
          />
          <Route
            path="profile"
            element={
              <PageTransition>
                <ProfilePage />
              </PageTransition>
            }
          />
          <Route
            path="smart-mandi"
            element={
              <PageTransition>
                <SmartMandiFinderPage />
              </PageTransition>
            }
          />
        </Route>
      </Route>

      <Route
        path="*"
        element={
          <PageTransition>
            <NotFoundPage />
          </PageTransition>
        }
      />
      <Route path="/home" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
