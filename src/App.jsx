import { useState } from "react";
import { Container, Row, Col, Form, InputGroup } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PostCard from "./components/PostCard";
import AuthModal from "./components/AuthModal";
import CreatePostModal from "./components/CreatePostModal";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Trạng thái đăng nhập
  const [showAuth, setShowAuth] = useState(false); // Ẩn/hiện Modal
  const [showCreateModal, setShowCreateModal] = useState(false);
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
  // Hàm xử lý khi nhấn nút "Đăng bài"
  const handleAddPost = (newPost) => {
    // Thêm bài mới lên đầu danh sách (dùng kỹ thuật Spread Operator [...])
    setPosts([newPost, ...posts]);
  };
  return (
    <div className="app-wrapper">
      <Header
        isLoggedIn={isLoggedIn}
        onLoginClick={() => setShowAuth(true)} // Dòng này truyền "lệnh" mở modal vào Header
        onLogout={() => setIsLoggedIn(false)}
      />

      <div className="main-content">
        <Container className="py-5">
          {/* justify-content-center để đẩy cột vào giữa */}
          <Row className="justify-content-center">
            {/* md={8} hoặc md={7} sẽ giúp nội dung gọn lại ở giữa màn hình máy tính */}
            <Col xs={12} md={8} lg={8}>
              {/* Lớp: Thanh tìm kiếm */}
              <InputGroup className="mb-4 search-container">
                <Form.Control
                  placeholder="Hinted search text"
                  className="search-input"
                />
                <InputGroup.Text className="search-icon-box">
                  <Search color="#6c757d" />
                </InputGroup.Text>
              </InputGroup>

              {/* Ô Đăng Bài hoặc Thông báo mời đăng nhập */}
              <div
                className="create-post-box mb-4 p-3 d-flex justify-content-between align-items-center"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  if (isLoggedIn) {
                    setShowCreateModal(true); // Đã đăng nhập -> Mở modal đăng bài
                  } else {
                    setShowAuth(true); // Chưa đăng nhập -> Hiện bảng đăng nhập ngay
                  }
                }}
              >
                {isLoggedIn ? (
                  <>
                    <p className="text-muted m-0">Bạn đang nghĩ gì?</p>
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

              {/* Lớp: Danh sách bài đăng */}
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
        {/* Modal tạo bài viết */}
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
        onLoginSuccess={() => setIsLoggedIn(true)}
      />
    </div>
  );
}
export default App;
