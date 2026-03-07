import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image, Spinner, Button } from "react-bootstrap";
import PostCard from "../components/PostCard";
import axios from "axios";
import { useParams } from "react-router-dom";
import { PencilSquare } from "react-bootstrap-icons";
import EditProfileModal from "../components/EditProfileModal";
import CreatePostModal from "../components/CreatePostModal";

const Profile = ({ currentUser, onUserUpdate }) => {
  const { id } = useParams();
  const [userProfile, setUserProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);

  // Hàm cập nhật lại giao diện sau khi sửa thành công
  const handleProfileUpdate = (updatedUser) => {
    setUserProfile(updatedUser);
    if (onUserUpdate) {
      onUserUpdate(updatedUser); // Cập nhật giao diện Header và Modal
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:3000/api/users/${id}`);
        setUserProfile(res.data.user);
        setPosts(res.data.posts);
      } catch (err) {
        console.error("Lỗi khi tải thông tin profile:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProfile();
    }
  }, [id]); // Đổi dependency thành [id] để trang tự load lại khi xem profile người khác

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="brown" />
        <p className="mt-2">Đang tải hồ sơ...</p>
      </Container>
    );
  }

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
    <Container className="py-4">
      <div
        className="text-center mb-5 p-4 rounded-4 shadow-sm position-relative"
        style={{ backgroundColor: "#fdf8f3" }}
      >
        {/* Nút Chỉnh sửa: Chỉ hiện khi xem profile của chính mình */}
        {currentUser?._id === id && (
          <Button
            variant="link"
            className="position-absolute text-brown shadow-none p-0"
            style={{ top: "15px", right: "20px", color: "#5c4023" }}
            onClick={() => setShowEditModal(true)} // Bật Modal khi click
          >
            <PencilSquare size={22} />
          </Button>
        )}
        <Image
          src={userProfile?.avatar || "/images/default_avatar.jpg"}
          roundedCircle
          width={120}
          height={120}
          className="border border-4 border-white shadow-sm mb-3"
          style={{ objectFit: "cover" }}
        />
        {/* Chỉ hiển thị displayName khi userProfile đã tồn tại */}
        <h2 className="fw-bold" style={{ color: "#5c4023" }}>
          {userProfile?.displayName || "Người dùng"}
        </h2>
      </div>

      <Row className="justify-content-center">
        <Col md={8}>
          {/* Chỉ hiện phần đăng bài nếu là profile của mình */}
          {currentUser?._id === id && (
            <div
              className="p-3 mb-4 rounded-4 shadow-sm border bg-white d-flex align-items-center gap-3"
              style={{ cursor: "pointer", transition: "0.2s" }}
              onClick={() => setShowCreatePost(true)}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#f8f9fa")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#fff")
              }
            >
              <Image
                src={currentUser?.avatar || "/images/default_avatar.jpg"}
                roundedCircle
                width={40}
                height={40}
                style={{ objectFit: "cover" }}
              />
              <div className="bg-light flex-grow-1 p-2 px-3 rounded-pill text-muted">
                Hôm nay {currentUser?.displayName} muốn chia sẻ điều gì với mọi
                người?
              </div>
            </div>
          )}
          <h5 className="mb-4 fw-bold" style={{ color: "#5c4023" }}>
            Bài viết đã đăng ({posts.length})
          </h5>
          {posts.length > 0 ? (
            posts.map((p) => (
              <PostCard
                key={p._id}
                post={p}
                currentUser={currentUser}
                content={p.desc}
                createdAt={p.createdAt}
                isOwner={currentUser?._id === id}
                onDelete={handleDeletePost}
                onUpdate={handleUpdatePost}
              />
            ))
          ) : (
            <p className="text-center text-muted">
              Chưa có bài viết nào được đăng.
            </p>
          )}
        </Col>
      </Row>

      <CreatePostModal
        show={showCreatePost}
        handleClose={() => setShowCreatePost(false)}
        onAddPost={handleAddPost}
        user={currentUser}
      />

      {userProfile && (
        <EditProfileModal
          show={showEditModal}
          handleClose={() => setShowEditModal(false)}
          userProfile={userProfile}
          onUpdate={handleProfileUpdate} // Truyền hàm cập nhật giao diện
        />
      )}
    </Container>
  );
};

export default Profile;
