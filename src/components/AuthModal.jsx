import { Modal, Button, Form, InputGroup } from "react-bootstrap";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const AuthModal = ({ show, handleClose, onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // Khởi tạo state cho form
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
    displayName: "", // Thêm fullName cho trường hợp đăng ký
  });

  // Hàm cập nhật dữ liệu khi người dùng gõ phím
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = isLogin
      ? "http://localhost:3000/api/auth/login"
      : "http://localhost:3000/api/auth/register";

    try {
      const response = await axios.post(apiUrl, formData);

      // Lấy dữ liệu từ Backend trả về
      const { token, ...userData } = response.data; // Lấy token riêng, còn lại gom vào userData
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData)); // Lưu userData (bao gồm displayName, phone, avatar...)

        Swal.fire({
          title: isLogin ? "Đăng nhập thành công!" : "Đăng ký thành công!",
          text: "Chào mừng bạn đến với cộng đồng guitar.",
          icon: "success",
          confirmButtonColor: "#5c4023",
          timer: 2000,
          showConfirmButton: false,
        });

        onLoginSuccess(userData); // Thông báo đăng nhập thành công
        handleClose();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Lỗi rồi!",
        text: error.response?.data?.message || "Thông tin không chính xác",
      });
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      onExited={() => setIsLogin(true)} // Tự động đưa về form Đăng nhập mỗi khi đóng
    >
      <Modal.Header closeButton className="border-0">
        <Modal.Title className="fw-bold" style={{ color: "#5c4023" }}>
          {isLogin ? "Đăng nhập" : "Đăng ký thành viên"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="px-4 pb-4">
        <Form onSubmit={handleSubmit}>
          {!isLogin && (
            <Form.Group className="mb-3">
              <Form.Label>Tên của bạn</Form.Label>
              <Form.Control
                name="displayName" // để hàm handleChange nhận diện
                type="text"
                placeholder="Ví dụ: Bông Bí Xanh"
                onChange={handleChange}
                required
              />
            </Form.Group>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Số điện thoại</Form.Label>
            <Form.Control
              name="phone"
              type="tel"
              placeholder="Nhập số điện thoại"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Mật khẩu</Form.Label>
            <InputGroup>
              <Form.Control
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Nhập mật khẩu"
                onChange={handleChange}
                required
                style={{ borderRight: "none" }}
              />
              <InputGroup.Text
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  backgroundColor: "transparent",
                  cursor: "pointer",
                  borderLeft: "none",
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
