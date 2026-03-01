import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Spinner, Button } from "react-bootstrap";
import axios from "axios";
import ReactMarkdown from "react-markdown";

const BlogDetail = () => {
  const { id } = useParams(); // Lấy ID từ thanh địa chỉ
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/blogs/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.error("Lỗi tải chi tiết blog:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogDetail();
  }, [id]);

  if (loading)
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" />
      </Container>
    );
  if (!blog)
    return (
      <Container className="py-5">
        <h3>Không tìm thấy bài viết!</h3>
      </Container>
    );

  return (
    <Container className="py-5" style={{ maxWidth: "800px" }}>
      <Link to="/blog">
        <Button variant="outline-dark" className="mb-4">
          ← Quay lại
        </Button>
      </Link>

      <img
        src={blog.image}
        alt={blog.title}
        style={{
          width: "100%",
          height: "400px",
          objectFit: "cover",
          borderRadius: "20px",
        }}
        className="mb-4 shadow-sm"
      />

      <h1 className="fw-bold mb-3" style={{ color: "#5c4023" }}>
        {blog.title}
      </h1>
      <p className="text-muted mb-4">
        Ngày đăng: {new Date(blog.createdAt).toLocaleDateString("vi-VN")}
      </p>

      <div
        className="blog-body"
        style={{
          fontSize: "1.1rem",
          lineHeight: "1.5",
          textAlign: "justify",
          // whiteSpace: "pre-line", // nhận diện dấu xuống dòng từ Database
        }}
      >
        <ReactMarkdown>{blog.content}</ReactMarkdown>
      </div>
    </Container>
  );
};

export default BlogDetail;
