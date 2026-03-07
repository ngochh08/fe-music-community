import { useState, useEffect } from "react";
import { Container, Row, Col, Form, InputGroup, Image } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import PostCard from "../components/PostCard";
import AuthModal from "../components/AuthModal";
import CreatePostModal from "../components/CreatePostModal";
import "../App.css";
import axios from "axios";

function Posts() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");

  const mainBrown = "#5c4023";

  // Tự động kiểm tra đăng nhập khi vừa load trang
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");
    if (savedUser && savedUser !== "undefined" && savedToken) {
      try {
        const parsedUser = JSON.parse(savedUser);
        if (parsedUser) {
          setIsLoggedIn(true);
          setCurrentUser(parsedUser);
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
    setCurrentUser(userData);
    setShowAuth(false);
  };

  // Xử lý đăng xuất xóa token
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/posts?page=${page}&limit=2&keyword=${keyword}`
        );
        const newPosts = [...posts, ...response.data.posts]; //merge các bài viết mới với các bài viết cũ
        setPosts(newPosts);
      } catch (error) {
        console.error("Không thể lấy bài viết:", error);
      }
    };
    fetchPosts();
  }, [page]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/posts?page=${1}&limit=2&keyword=${keyword}`
        );
        setPage(1);
        setPosts(response.data.posts);
      } catch (error) {
        console.error("Không thể lấy bài viết:", error);
      }
    };
    fetchPosts();
  }, [keyword]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setPage((page) => page + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
              <div className="search-wrapper mb-4 position-relative">
                <Form.Control
                  type="text"
                  placeholder="Tìm kiếm bài viết..."
                  className="search-input-v2 rounded-pill border-0 shadow-sm px-4 py-2"
                  style={{
                    backgroundColor: "#fff",
                    paddingRight: "45px", // Chừa chỗ cho icon search
                    fontSize: "0.95rem",
                    height: "45px",
                    transition: "all 0.3s ease",
                  }}
                  value={keyword}
                  onChange={(event) => setKeyword(event.target.value)}
                />
                <div
                  className="position-absolute d-flex align-items-center justify-content-center"
                  style={{
                    top: "0",
                    right: "15px",
                    height: "100%",
                    cursor: "pointer",
                  }}
                >
                  <Search
                    size={18}
                    color={mainBrown}
                    style={{ opacity: 0.6 }}
                  />
                </div>
              </div>

              <div
                className="p-3 mb-4 rounded-4 shadow-sm border bg-white d-flex align-items-center gap-3"
                style={{ cursor: "pointer", transition: "0.2s" }}
                onClick={() =>
                  isLoggedIn ? setShowCreateModal(true) : setShowAuth(true)
                }
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f8f9fa")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "#fff")
                }
              >
                {isLoggedIn ? (
                  <>
                    <Image
                      src={currentUser?.avatar || "/images/default_avatar.jpg"}
                      roundedCircle
                      width={40}
                      height={40}
                      style={{ objectFit: "cover" }}
                    />
                    <div className="bg-light flex-grow-1 p-2 px-3 rounded-pill text-muted">
                      Hôm nay {currentUser?.displayName} muốn chia sẻ điều gì
                      với mọi người?
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-light flex-grow-1 p-2 px-3 rounded-pill text-muted">
                      <b style={{ color: "#5c4023" }}>Đăng nhập</b> để chia sẻ
                      bài viết của bạn...
                    </div>
                    <div
                      className="plus-icon-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        backgroundColor: "#5c402322",
                        color: "#5c4023",
                      }}
                    >
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
                    currentUser?._id === post.userId?._id ||
                    currentUser?.id === post.userId?._id
                  }
                  currentUser={currentUser}
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
          user={currentUser}
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
