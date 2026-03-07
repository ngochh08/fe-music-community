import React from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  ArrowRightCircle,
  PlayCircle,
  MusicNoteBeamed,
} from "react-bootstrap-icons";
import { Facebook, Youtube, Instagram, Tiktok } from "react-bootstrap-icons";
import { JournalCheck, MusicNoteList, Stars } from "react-bootstrap-icons";

const Home = () => {
  const mainBrown = "#8c6943";

  return (
    <div
      className="home-wrapper"
      style={{
        backgroundColor: "#fff",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      {/* 1. Hero Section */}
      <section
        className="hero-section d-flex align-items-center"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.2)), url('https://i.pinimg.com/1200x/f6/f5/b7/f6f5b7fb8eff0d21ebf37512bf66c4b3.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "90vh",
          borderBottomLeftRadius: "80px",
          position: "relative",
        }}
      >
        <Container>
          <Row>
            <Col lg={7} className="text-white">
              <h1
                className="display-1 fw-bold mb-4 animate__animated animate__fadeInUp"
                style={{ lineHeight: "1.1" }}
              >
                Kết nối tâm hồn <br />{" "}
                <span style={{ color: "#dcb691" }}>Qua từng giai điệu</span>
              </h1>
              <p
                className="lead mb-5 opacity-90"
                style={{ fontSize: "1.3rem", maxWidth: "550px" }}
              >
                Hành trình chinh phục Guitar của bạn bắt đầu từ đây. Cùng chia
                sẻ, học hỏi và lan tỏa đam mê mỗi ngày.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <Link to="/posts">
                  <Button
                    className="rounded-pill px-5 py-3 fw-bold border-0 shadow-lg"
                    style={{ backgroundColor: mainBrown, color: "#fff" }}
                  >
                    Góc chia sẻ <ArrowRightCircle className="ms-2" />
                  </Button>
                </Link>
                <Link to="/blog">
                  <Button
                    variant="outline-light"
                    className="rounded-pill px-5 py-3 fw-bold border-2"
                  >
                    <PlayCircle className="ms-2 me-2" /> Khám phá bài viết
                  </Button>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* 2. Feature Section */}
      <Container className="py-5" style={{ marginTop: "-80px" }}>
        <Row className="g-4">
          {[
            {
              icon: <JournalCheck size={40} />,
              title: "Lộ trình bài bản",
              desc: "Từ Zero đến Hero với hệ thống bài giảng dễ tiếp cận được biên soạn đặc biệt cho người mới bắt đầu.",
            },
            {
              icon: <MusicNoteList size={40} />,
              title: "Bí Kíp Luyện Đàn",
              desc: "Từ mẹo bấm hợp âm không rè dây đến kỹ thuật quạt chả cực mượt, giúp bạn làm chủ cây đàn Guitar chỉ trong thời gian ngắn.",
            },
            {
              icon: <Stars size={40} />,
              title: "Cảm hứng mỗi ngày",
              desc: "Không gian kết nối những tâm hồn yêu nhạc, chia sẻ kinh nghiệm và lan tỏa niềm đam mê Guitar.",
            },
          ].map((item, idx) => (
            <Col md={4} key={idx}>
              <div
                className="p-5 bg-white border-0 shadow-lg h-100 text-center"
                style={{
                  borderRadius: "30px",
                  transition: "all 0.3s ease",
                  cursor: "default",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow =
                    "0 15px 30px rgba(140, 105, 67, 0.15)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 1rem 3rem rgba(0,0,0,.175)";
                }}
              >
                {/* Vòng tròn chứa Icon - Điểm nhấn mới */}
                <div
                  className="d-inline-flex align-items-center justify-content-center mb-4"
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "20px",
                    backgroundColor: `${mainBrown}15`,
                    color: mainBrown,
                  }}
                >
                  {item.icon}
                </div>

                <h4
                  className="fw-bold mb-3"
                  style={{ color: mainBrown, letterSpacing: "-0.5px" }}
                >
                  {item.title}
                </h4>
                <p
                  className="text-muted mb-0"
                  style={{ fontSize: "0.95rem", lineHeight: "1.6" }}
                >
                  {item.desc}
                </p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* 3. Community Highlight */}
      <section className="py-5">
        <Container className="py-5">
          <Row className="align-items-center">
            <Col lg={6}>
              <div className="position-relative">
                <Image
                  src="https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=800"
                  fluid
                  className="rounded-5 shadow-lg"
                  style={{ transform: "rotate(-2deg)" }}
                />
                <div
                  className="position-absolute bg-white p-4 shadow-lg rounded-4"
                  style={{ bottom: "-20px", right: "20px", maxWidth: "250px" }}
                >
                  <MusicNoteBeamed
                    size={30}
                    color={mainBrown}
                    className="mb-2"
                  />
                  <h5 className="fw-bold mb-1">1000+</h5>
                  <small className="text-muted">
                    Thành viên đang cùng luyện tập hằng ngày.
                  </small>
                </div>
              </div>
            </Col>
            <Col lg={5} className="offset-lg-1 mt-5 mt-lg-0">
              <h2
                className="display-4 fw-bold mb-4"
                style={{ color: mainBrown }}
              >
                Kết nối qua từng phím đàn
              </h2>
              <p className="text-muted mb-4 fs-5">
                Nơi tập hợp những người chơi Guitar thực thụ. Chia sẻ kinh
                nghiệm, cập nhật kiến thức và tìm kiếm nguồn cảm hứng mới cho
                phong cách chơi của bạn.
              </p>
              <Link to="/posts">
                <Button
                  variant="link"
                  className="p-0 text-decoration-none fw-bold fs-5"
                  style={{ color: mainBrown }}
                >
                  Tham gia cộng đồng ngay →
                </Button>
              </Link>
            </Col>
          </Row>
        </Container>
      </section>

      {/* 4. Social Media */}
      <section className="py-5" style={{ backgroundColor: "#fdfaf7" }}>
        <Container className="text-center">
          <h2 className="fw-bold mb-2" style={{ color: mainBrown }}>
            Lan tỏa đam mê
          </h2>
          <p className="text-muted mb-5">
            Ghé chơi với tụi mình ở đây nữa nè! ✨
          </p>

          <div className="d-flex justify-content-center gap-5 flex-wrap">
            {[
              {
                icon: <Facebook size={32} />,
                name: "Facebook",
                link: "https://facebook.com/uithcm",
              },
              {
                icon: <Youtube size={32} />,
                name: "Youtube",
                link: "https://youtube.com/c/UITV",
              },
              {
                icon: <Instagram size={32} />,
                name: "Instagram",
                link: "https://instagram.com/uit.hcm",
              },
              {
                icon: <Tiktok size={32} />,
                name: "TikTok",
                link: "https://tiktok.com/@uit.hcm",
              },
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.link}
                target="_blank"
                rel="noreferrer"
                className="text-decoration-none d-flex flex-column align-items-center gap-2"
                style={{
                  color: mainBrown, // Ép màu icon và chữ về màu chủ đạo
                  transition: "all 0.3s ease",
                  width: "80px",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "scale(1.1)";
                  e.currentTarget.style.opacity = "0.8";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.opacity = "1";
                }}
              >
                <div
                  className="p-3 rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    border: `1px solid ${mainBrown}33`,
                    backgroundColor: "#fff",
                  }}
                >
                  {social.icon}
                </div>
                <span className="fw-bold" style={{ fontSize: "0.85rem" }}>
                  {social.name}
                </span>
              </a>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Home;
