import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const mainBrown = "#5c4023";

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/blogs");
        setBlogs(res.data);
      } catch (err) {
        console.error("Lỗi tải blog:", err);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold" style={{ color: mainBrown }}>
          Góc Học Đàn
        </h1>
        <p className="text-muted">
          Chia sẻ kiến thức, kỹ thuật và cảm hứng âm nhạc
        </p>
        <hr
          style={{
            width: "50px",
            margin: "auto",
            borderTop: `3px solid ${mainBrown}`,
          }}
        />
      </div>

      <Row>
        {blogs.map((blog) => (
          <Col lg={4} md={6} key={blog._id} className="mb-4">
            <Card
              className="h-100 border-0 shadow-sm"
              style={{
                borderRadius: "10px", // Bo góc Card
                overflow: "hidden", // Cắt phần ảnh thừa ở góc
                transition: "transform 0.3s ease-in-out",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)"; // Nhấc card lên 10px
                e.currentTarget.style.boxShadow =
                  "0 10px 20px rgba(0,0,0,0.15)"; // Đổ bóng đậm hơn
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)"; // Trả về vị trí cũ
                e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)"; // Trả về bóng cũ
              }}
            >
              <Card.Img
                variant="top"
                src={blog.image}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/600x400?text=Guitar+Blog";
                }}
                style={{
                  height: "200px",
                  objectFit: "cover",
                }}
              />
              <Card.Body>
                <Card.Title className="fw-bold" style={{ color: "#5c4023" }}>
                  {blog.title}
                </Card.Title>
                <Card.Text className="text-muted small">
                  {blog.summary}
                </Card.Text>
                <Link
                  to={`/blog/${blog._id}`}
                  style={{
                    color: "#5c4023",
                    fontWeight: "bold",
                    textDecoration: "none",
                  }}
                >
                  Đọc tiếp →
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Blog;
