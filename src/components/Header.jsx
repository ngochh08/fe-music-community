import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Image,
  Button,
} from "react-bootstrap";

const Header = ({ isLoggedIn, user, onLoginClick, onLogout }) => {
  return (
    <Navbar
      style={{ backgroundColor: "#5c4023" }}
      variant="dark"
      expand="lg"
      className="py-2"
    >
      <Container>
        <Navbar.Brand
          href="/"
          className="fw-normal fs-3"
          style={{ fontFamily: "serif" }}
        >
          hocdanguitar
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="align-items-center">
            <Nav.Link href="#community" className="text-white me-3">
              Community
            </Nav.Link>

            {isLoggedIn ? (
              // Sử dụng NavDropdown để gom tên, ảnh và nút thoát vào một chỗ
              <NavDropdown
                title={
                  <div className="d-inline-flex align-items-center gap-2">
                    <Image
                      src={user?.avatar}
                      roundedCircle
                      width={35}
                      height={35}
                      style={{ objectFit: "cover", border: "1px solid #fff" }}
                    />
                    <span className="text-white fw-bold">
                      {user?.displayName}
                    </span>
                  </div>
                }
                id="user-dropdown"
                align="end"
                className="custom-dropdown-toggle"
              >
                <NavDropdown.Item href="#profile">
                  Trang cá nhân
                </NavDropdown.Item>
                <NavDropdown.Item href="#settings">Cài đặt</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={onLogout} className="text-danger">
                  Thoát tài khoản
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Button
                variant="light"
                size="sm"
                className="px-4 rounded-pill"
                onClick={onLoginClick}
              >
                Đăng nhập
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Header;
