import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import PostCard from "../components/PostCard";
import axios from "axios";

const Profile = ({ currentUser }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await axios.get(
        `http://localhost:3000/api/users/${currentUser._id}`
      );
      setUserProfile(res.data.user);
      setPosts(res.data.posts);
    };
    fetchProfile();
  }, [currentUser]);

  return (
    <Container className="py-4">
      <div
        className="text-center mb-5 p-4 rounded-4 shadow-sm"
        style={{ backgroundColor: "#fdf8f3" }}
      >
        <Image
          src={userProfile?.avatar || "https://i.pravatar.cc/150"}
          roundedCircle
          width={120}
          height={120}
          className="border border-4 border-white shadow-sm mb-3"
          style={{ objectFit: "cover" }}
        />
        <h2 className="fw-bold" style={{ color: "#5c4023" }}>
          {userProfile?.displayName}
        </h2>
        <p className="text-muted italic">"Yêu âm nhạc"</p>
      </div>

      {/* Danh sách bài viết của riêng User này */}
      <Row className="justify-content-center">
        <Col md={8}>
          <h5 className="mb-4 fw-bold">Bài viết đã đăng ({posts.length})</h5>
          {posts.map((p) => (
            <PostCard key={p._id} post={p} user={currentUser} />
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
