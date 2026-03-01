import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  const mainBrown = "#8c6943";

  return (
    <div
      className="home-wrapper"
      style={{ backgroundColor: "#fdfaf7", minHeight: "100vh" }}
    >
      {/* 1. Hero Section*/}
      <section
        className="hero-section d-flex align-items-center justify-content-center text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://i.pinimg.com/1200x/f6/f5/b7/f6f5b7fb8eff0d21ebf37512bf66c4b3.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "500px",
          padding: "100px 0",
        }}
      >
        <Container className="text-center">
          <h1
            className="display-2 fw-bold mb-4"
            style={{ letterSpacing: "2px" }}
          >
            Kết nối tâm hồn <br /> Qua từng giai điệu
          </h1>
          <p
            className="lead mb-5 mx-auto opacity-75"
            style={{ maxWidth: "700px", fontSize: "1.2rem" }}
          >
            Hành trình chinh phục Guitar của bạn bắt đầu từ đây. Cùng chia sẻ,
            học hỏi và lan tỏa đam mê mỗi ngày.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/posts">
              <Button
                size="lg"
                variant="outline-light"
                style={{
                  padding: "12px 35px",
                  borderWidth: "2px",
                }}
                className="rounded-pill fw-bold shadow-sm"
              >
                Góc chia sẻ
              </Button>
            </Link>

            <Link to="/blog">
              <Button
                size="lg"
                className="rounded-pill shadow fw-bold text-white"
                style={{
                  backgroundColor: mainBrown,
                  border: `2px solid ${mainBrown}`,
                  padding: "12px 35px",
                  transition: "background-color 0.3s ease", // Chỉ transition màu nền
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#7a5633"; // Nâu sáng hơn
                  e.currentTarget.style.borderColor = "#7a5633";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = mainBrown;
                  e.currentTarget.style.borderColor = mainBrown;
                }}
              >
                Khám phá bài viết
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* 2. Feature Section */}
      <Container
        className="py-5 mt-4"
        style={{ marginTop: "-50px", position: "relative", zIndex: 2 }}
      >
        <Row className="text-center g-4">
          <Col md={4}>
            <div
              className="p-4 bg-white shadow-sm h-100"
              style={{ borderRadius: "20px" }}
            >
              <div className="fs-1 mb-3">🎸</div>
              <h4 className="fw-bold">Học Đàn</h4>
              <p className="text-muted">
                Tổng hợp lộ trình từ cơ bản đến nâng cao cho người mới.
              </p>
            </div>
          </Col>
          <Col md={4}>
            <div
              className="p-4 bg-white shadow-sm h-100"
              style={{ borderRadius: "20px" }}
            >
              <div className="fs-1 mb-3">📖</div>
              <h4 className="fw-bold">Kiến Thức</h4>
              <p className="text-muted">
                Các mẹo bấm hợp âm, quạt chả và bảo quản đàn hiệu quả.
              </p>
            </div>
          </Col>
          <Col md={4}>
            <div
              className="p-4 bg-white shadow-sm h-100"
              style={{ borderRadius: "20px" }}
            >
              <div className="fs-1 mb-3">🤝</div>
              <h4 className="fw-bold">Kết Nối</h4>
              <p className="text-muted">
                Cộng đồng trao đổi và giải đáp thắc mắc về Guitar.
              </p>
            </div>
          </Col>
        </Row>
      </Container>

      {/* 3. Social Media Section - Kết nối cộng đồng */}
      <section className="py-5" style={{ backgroundColor: "#fff" }}>
        <Container className="text-center py-4">
          <h2 className="fw-bold mb-4" style={{ color: mainBrown }}>
            Kết nối với chúng mình
          </h2>
          <p className="text-muted mb-5">
            Theo dõi các hoạt động và cập nhật kiến thức Guitar mới nhất qua
            mạng xã hội.
          </p>

          <Row className="justify-content-center g-4">
            {/* Facebook */}
            <Col xs={6} md={2}>
              <a
                href="https://facebook.com/uithcm"
                target="_blank"
                rel="noreferrer"
                className="text-decoration-none"
              >
                <div
                  className="p-3 shadow-sm hover-social"
                  style={{ borderRadius: "15px", backgroundColor: "#f0f2f5" }}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                    alt="Facebook"
                    style={{
                      width: "40px",
                      height: "40px",
                      marginBottom: "10px",
                    }}
                  />
                  <div className="fw-bold text-dark">Facebook</div>
                </div>
              </a>
            </Col>

            {/* Youtube */}
            <Col xs={6} md={2}>
              <a
                href="https://youtube.com/c/UITV"
                target="_blank"
                rel="noreferrer"
                className="text-decoration-none"
              >
                <div
                  className="p-3 shadow-sm hover-social"
                  style={{ borderRadius: "15px", backgroundColor: "#fff1f0" }}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png"
                    alt="Youtube"
                    style={{
                      width: "40px",
                      height: "40px",
                      marginBottom: "10px",
                    }}
                  />
                  <div className="fw-bold text-dark">Youtube</div>
                </div>
              </a>
            </Col>

            {/* Instagram */}
            <Col xs={6} md={2}>
              <a
                href="https://instagram.com/uit.hcm"
                target="_blank"
                rel="noreferrer"
                className="text-decoration-none"
              >
                <div
                  className="p-3 shadow-sm hover-social"
                  style={{ borderRadius: "15px", backgroundColor: "#fff0f6" }}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
                    alt="Instagram"
                    style={{
                      width: "40px",
                      height: "40px",
                      marginBottom: "10px",
                    }}
                  />
                  <div className="fw-bold text-dark">Instagram</div>
                </div>
              </a>
            </Col>

            {/* TikTok */}
            <Col xs={6} md={2}>
              <a
                href="https://tiktok.com/@uit.hcm"
                target="_blank"
                rel="noreferrer"
                className="text-decoration-none"
              >
                <div
                  className="p-3 shadow-sm hover-social"
                  style={{ borderRadius: "15px", backgroundColor: "#f5f5f5" }}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3046/3046121.png"
                    alt="TikTok"
                    style={{
                      width: "40px",
                      height: "40px",
                      marginBottom: "10px",
                    }}
                  />
                  <div className="fw-bold text-dark">TikTok</div>
                </div>
              </a>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Home;
