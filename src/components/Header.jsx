import { Navbar, Nav, Container, Button, Image } from "react-bootstrap";

const Header = ({ isLoggedIn, onLoginClick, onLogout }) => {
  return (
    <Navbar
      style={{ backgroundColor: "#5c4023" }}
      variant="dark"
      expand="lg"
      className="py-3"
    >
      <Container>
        <Navbar.Brand
          href="/"
          className="fw-normal fs-3"
          style={{ fontFamily: "serif" }}
        >
          hocdanguitar
        </Navbar.Brand>

        <Navbar.Collapse className="justify-content-end">
          <Nav className="gap-3 align-items-center">
            <Nav.Link href="#community" className="text-white">
              Community
            </Nav.Link>

            {isLoggedIn ? (
              <div className="d-flex align-items-center gap-3">
                <Image
                  src="https://i.pravatar.cc/150?u=a"
                  roundedCircle
                  width={35}
                />
                <Button variant="outline-light" size="sm" onClick={onLogout}>
                  Thoát
                </Button>
              </div>
            ) : (
              <Button
                variant="light"
                size="sm"
                className="px-3"
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
