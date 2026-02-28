import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image, Spinner } from "react-bootstrap";
import PostCard from "../components/PostCard";
import axios from "axios";
import { useParams } from "react-router-dom";

const Profile = ({ currentUser }) => {
  const { id } = useParams();
  const [userProfile, setUserProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

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
        className="text-center mb-5 p-4 rounded-4 shadow-sm"
        style={{ backgroundColor: "#fdf8f3" }}
      >
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
        <p className="text-muted italic">"Yêu âm nhạc"</p>
      </div>

      <Row className="justify-content-center">
        <Col md={8}>
          <h5 className="mb-4 fw-bold" style={{ color: "#5c4023" }}>
            Bài viết đã đăng ({posts.length})
          </h5>
          {posts.length > 0 ? (
            posts.map((p) => (
              <PostCard
                key={p._id}
                post={p}
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
    </Container>
  );
};

export default Profile;
