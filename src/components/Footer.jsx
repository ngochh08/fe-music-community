import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="footer-section py-5 mt-5">
      <Container>
        <Row>
          {/* Cột 1: Logo chiếm 4 phần bên trái */}
          <Col md={4} className="text-start">
            <h2 className="footer-logo mb-3">hocdanguitar</h2>
            <p className="text-muted small">Made with Squarespace</p>
          </Col>

          {/* Cột trống: Chiếm 2 phần để tạo khoảng cách đẩy các cột sau sang phải */}
          <Col md={2}></Col>

          {/* Cột 2: Location chiếm 3 phần */}
          <Col md={3} className="text-start">
            <h5 className="footer-heading mb-3">Location</h5>
            <p className="text-muted mb-1 small">123 Demo Street</p>
            <p className="text-muted small">New York, NY 12345</p>
          </Col>

          {/* Cột 3: Contact chiếm 3 phần còn lại ở sát lề phải */}
          <Col md={3} className="text-start">
            <h5 className="footer-heading mb-3">Contact</h5>
            <p className="text-muted mb-1 small">email@example.com</p>
            <p className="text-muted small">(555) 555-5555</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
