import { Modal, Button, Form, InputGroup } from "react-bootstrap";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { useState } from "react";
import Swal from "sweetalert2";

const AuthModal = ({ show, handleClose, onLoginSuccess }) => {
  // Trạng thái để biết đang ở chế độ Đăng nhập (true) hay Đăng ký (false)
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Giả lập xử lý đăng nhập thành công
    onLoginSuccess();
    handleClose();

    // Hiện Popup thông báo dựa trên chế độ
    Swal.fire({
      title: isLogin ? "Đăng nhập thành công!" : "Đăng ký thành công!",
      text: isLogin
        ? "Chào mừng bạn quay trở lại với cộng đồng guitar."
        : "Tài khoản của bạn đã được tạo và tự động đăng nhập.",
      icon: "success",
      confirmButtonColor: "#5c4023",
      timer: 5000, // Tự đóng sau 5 giây
      showConfirmButton: false,
    });
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="border-0">
        <Modal.Title className="fw-bold" style={{ color: "#5c4023" }}>
          {isLogin ? "Đăng nhập" : "Đăng ký thành viên"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="px-4 pb-4">
        <Form onSubmit={handleSubmit}>
          {/* Nếu là Đăng ký thì hiện thêm ô nhập Tên */}
          {!isLogin && (
            <Form.Group className="mb-3">
              <Form.Label>Tên của bạn</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ví dụ: Bông Bí Xanh"
                required
              />
            </Form.Group>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Số điện thoại</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Nhập số điện thoại"
              pattern="[0-9]{10,11}"
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Mật khẩu</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPassword ? "text" : "password"} // Thay đổi type dựa trên state
                placeholder="Nhập mật khẩu"
                required
                style={{ borderRight: "none" }} // Bỏ viền phải để nối liền với icon
              />
              <InputGroup.Text
                onClick={() => setShowPassword(!showPassword)} // Đảo ngược trạng thái khi click
                style={{
                  backgroundColor: "transparent",
                  cursor: "pointer",
                  borderLeft: "none", // Bỏ viền trái để nối liền với input
                }}
              >
                {showPassword ? (
                  <EyeSlash color="#5c4023" />
                ) : (
                  <Eye color="#5c4023" />
                )}
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>

          <Button
            type="submit"
            className="w-100 border-0 py-2 mb-3"
            style={{ backgroundColor: "#5c4023" }}
          >
            {isLogin ? "Vào học đàn ngay" : "Tạo tài khoản mới"}
          </Button>

          {/* Nút chuyển đổi giữa Đăng nhập và Đăng ký */}
          <div className="text-center">
            <small className="text-muted">
              {isLogin ? "Chưa có tài khoản?" : "Đã có tài khoản rồi?"}{" "}
              <span
                style={{
                  color: "#5c4023",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Đăng ký ngay" : "Đăng nhập tại đây"}
              </span>
            </small>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AuthModal;
