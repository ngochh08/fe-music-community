import { useState, useEffect } from "react";
import { Container, Row, Col, Form, InputGroup } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PostCard from "../components/PostCard";
import AuthModal from "../components/AuthModal";
import CreatePostModal from "../components/CreatePostModal";
import "../App.css";
import axios from "axios";

function Posts() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

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

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/posts");
        setPosts(response.data);
      } catch (error) {
        console.error("Không thể lấy bài viết:", error);
      }
    };
    fetchPosts();
  }, []);

  // Hàm xử lý Xóa bài viết
  const handleDeletePost = async (postId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/api/posts/${postId}`, {
        headers: { token: `Bearer ${token}` },
      });
      // Cập nhật state để xóa bài viết khỏi giao diện ngay lập tức
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error("Lỗi khi xóa bài viết:", error);
      alert(error.response?.data || "Có lỗi xảy ra khi xóa bài viết");
    }
  };

  // Hàm xử lý Cập nhật bài viết sau khi sửa thành công
  const handleUpdatePost = (updatedPost) => {
    setPosts(
      posts.map((post) => (post._id === updatedPost._id ? updatedPost : post))
    );
  };

  const handleAddPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="app-wrapper">
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
                  key={post._id}
                  // Truyền nguyên object post để PostCard lấy dữ liệu dễ hơn
                  post={post}
                  // Kiểm tra xem user hiện tại có phải chủ bài viết không (để hiện nút Sửa/Xóa)
                  isOwner={
                    user?._id === post.userId?._id ||
                    user?.id === post.userId?._id
                  }
                  user={post.userId?.displayName}
                  avatar={post.userId?.avatar}
                  content={post.desc}
                  image={post.img}
                  createdAt={post.createdAt}
                  // Truyền 2 hàm xử lý xuống
                  onDelete={handleDeletePost}
                  onUpdate={handleUpdatePost}
                />
              ))}
            </Col>
          </Row>
        </Container>

        <CreatePostModal
          show={showCreateModal}
          handleClose={() => setShowCreateModal(false)}
          onAddPost={handleAddPost}
          user={user}
        />
      </div>

      <AuthModal
        show={showAuth}
        handleClose={() => setShowAuth(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}

export default Posts;
