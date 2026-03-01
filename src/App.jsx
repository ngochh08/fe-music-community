import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AuthModal from "./components/AuthModal";
import Posts from "./pages/Posts";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import "./App.css";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved && saved !== "undefined" ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (currentUser && savedToken) {
      setIsLoggedIn(true);
    }
  }, [currentUser]);

  const handleLoginSuccess = (userData) => {
    setIsLoggedIn(true);
    setCurrentUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // Lưu khi đăng nhập
    setShowAuth(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setCurrentUser(null);
    window.location.href = "/";
    alert("Đăng xuất thành công!");
  };

  const updateCurrentUser = (newUser) => {
    setCurrentUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser)); // Lưu lại vào bộ nhớ trình duyệt
  };

  return (
    <Router>
      <div className="app-wrapper">
        <Header
          currentUser={currentUser}
          isLoggedIn={isLoggedIn}
          onLoginClick={() => setShowAuth(true)}
          onLogout={handleLogout}
        />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route
              path="/posts"
              element={
                <Posts
                  currentUser={currentUser}
                  isLoggedIn={isLoggedIn}
                  setShowAuth={() => setShowAuth(true)}
                />
              }
            />
            <Route
              path="/profile/:id"
              element={
                <Profile
                  currentUser={currentUser}
                  onUserUpdate={updateCurrentUser}
                />
              }
            />
            ;
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
