import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AuthModal from "./components/AuthModal";
import Posts from "./pages/Posts";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");
    if (savedUser && savedUser !== "undefined" && savedToken) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setIsLoggedIn(true);
        setUser(parsedUser);
      } catch (error) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    setShowAuth(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <Router>
      <div className="app-wrapper">
        <Header
          isLoggedIn={isLoggedIn}
          user={user}
          onLoginClick={() => setShowAuth(true)}
          onLogout={handleLogout}
        />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/posts"
              element={
                <Posts
                  user={user}
                  isLoggedIn={isLoggedIn}
                  setShowAuth={() => setShowAuth(true)}
                />
              }
            />
            <Route
              path="/profile/:id"
              element={<Profile currentUser={user} />}
            />
          </Routes>
        </div>
        <Footer />
        <AuthModal
          show={showAuth}
          handleClose={() => setShowAuth(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      </div>
    </Router>
  );
}
export default App;
