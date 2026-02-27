import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  const mainBrown = "#5c4023";

  return (
    <Container className="text-center py-5">
      <div
        className="py-5 shadow-sm rounded-4"
        style={{
          backgroundColor: "#fdf8f3",
          border: `1px solid ${mainBrown}22`,
        }}
      >
        <h1 style={{ color: mainBrown }} className="fw-bold display-4">
          Music Community
        </h1>
        <p className="fs-5 text-muted mb-4">
          Nơi những tâm hồn yêu âm nhạc kết nối và chia sẻ.
        </p>
        <div className="d-flex justify-content-center gap-3">
          <Button
            as={Link}
            to="/posts"
            style={{ backgroundColor: mainBrown, border: "none" }}
            className="px-4 py-2 fw-bold"
          >
            Khám phá bài viết
          </Button>
          <Button variant="outline-dark" className="px-4 py-2">
            Tìm hiểu thêm
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Home;
