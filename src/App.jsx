import { useState, useEffect } from "react";
import { Container, Row, Col, Form, InputGroup } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PostCard from "./components/PostCard";
import AuthModal from "./components/AuthModal";
import CreatePostModal from "./components/CreatePostModal";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [user, setUser] = useState(null);

  // Tự động kiểm tra đăng nhập khi vừa load trang
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");
    if (savedUser && savedUser !== "undefined" && savedToken) {
      try {
        const parsedUser = JSON.parse(savedUser);
        if (parsedUser) {
          setIsLoggedIn(true);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error("Lỗi dữ liệu JSON, đang xóa bộ nhớ tạm...");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }
  }, []);

  // Xử lý khi đăng nhập thành công từ AuthModal
  const handleLoginSuccess = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    setShowAuth(false);
  };

  // Xử lý đăng xuất xóa token
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
  };

  const [posts, setPosts] = useState([
    {
      id: 1,
      user: "Cá voi xanh",
      content: "Mọi người có ai biết bài nào dễ tập cho người mới không?",
      image: "https://images.unsplash.com/photo-1524230572899-a752b3835840",
      likes: 12,
      comments: 5,
    },
  ]);

  const handleAddPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="app-wrapper">
      <Header
        isLoggedIn={isLoggedIn}
        user={user} // Truyền user để Header hiển thị tên
        onLoginClick={() => setShowAuth(true)}
        onLogout={handleLogout} // Sử dụng hàm logout đã xử lý localStorage
      />

      <div className="main-content">
        <Container className="py-5">
          <Row className="justify-content-center">
            <Col xs={12} md={8} lg={8}>
              <InputGroup className="mb-4 search-container">
                <Form.Control
                  placeholder="Tìm kiếm bài viết..."
                  className="search-input"
                />
                <InputGroup.Text className="search-icon-box">
                  <Search color="#6c757d" />
                </InputGroup.Text>
              </InputGroup>

              <div
                className="create-post-box mb-4 p-3 d-flex justify-content-between align-items-center"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  isLoggedIn ? setShowCreateModal(true) : setShowAuth(true)
                }
              >
                {isLoggedIn ? (
                  <>
                    <p className="text-muted m-0">
                      Chào {user?.displayName || "bạn"}, bạn đang nghĩ gì?
                    </p>
                    <div className="plus-icon-circle">+</div>
                  </>
                ) : (
                  <>
                    <p className="m-0" style={{ color: "#5c4023" }}>
                      <b>Đăng nhập</b> để chia sẻ bài viết của bạn...
                    </p>
                    <div className="plus-icon-circle" style={{ opacity: 0.5 }}>
                      +
                    </div>
                  </>
                )}
              </div>

              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  isLoggedIn={isLoggedIn}
                  user={post.user}
                  content={post.content}
                  image={post.image}
                />
              ))}
            </Col>
          </Row>
        </Container>

        <CreatePostModal
          show={showCreateModal}
          handleClose={() => setShowCreateModal(false)}
          onAddPost={handleAddPost}
        />
      </div>
      <Footer />
      <AuthModal
        show={showAuth}
        handleClose={() => setShowAuth(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}

export default App;
