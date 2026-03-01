import React, { useState } from "react";
import { Modal, Button, Form, Image, Spinner } from "react-bootstrap";
import axios from "axios";

const EditProfileModal = ({ show, handleClose, userProfile, onUpdate }) => {
  const [displayName, setDisplayName] = useState(
    userProfile?.displayName || ""
  );
  const [avatar, setAvatar] = useState(userProfile?.avatar || "");
  const [file, setFile] = useState(null); // Biến chứa file ảnh người dùng chọn
  const [loading, setLoading] = useState(false);

  // Xử lý chọn ảnh từ máy
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setAvatar(URL.createObjectURL(selectedFile));
    }
  };

  // Upload ảnh lên Cloudinary
  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "guitar_preset");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dhzj4ciy6/image/upload",
        formData
      );
      return res.data.secure_url; // Trả về link ảnh thực tế
    } catch (err) {
      console.error("Lỗi upload ảnh:", err);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let finalAvatarUrl = avatar;
      // 1. Nếu người dùng chọn ảnh mới, thực hiện upload
      if (file) {
        const uploadedUrl = await uploadImage();
        if (uploadedUrl) {
          finalAvatarUrl = uploadedUrl;
        }
      }

      // 2. Gọi API cập nhật thông tin user ở Backend
      const res = await axios.put(
        `http://localhost:3000/api/users/${userProfile._id}`,
        {
          userId: userProfile._id, // Backend kiểm tra quyền
          displayName: displayName,
          avatar: finalAvatarUrl,
        }
      );

      // 3. Cập nhật lại giao diện và đóng Modal
      onUpdate(res.data);
      setFile(null);
      handleClose();
      alert("Cập nhật hồ sơ thành công!");
    } catch (err) {
      console.error("Lỗi cập nhật profile:", err);
      alert("Có lỗi xảy ra khi cập nhật!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="border-0">
        <Modal.Title className="fw-bold">Chỉnh sửa hồ sơ</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {/* Phần hiển thị và chọn ảnh đại diện */}
          <div className="text-center mb-4">
            <Image
              src={avatar || "/images/default_avatar.jpg"}
              roundedCircle
              width={100}
              height={100}
              style={{ objectFit: "cover" }}
              className="border border-3 border-white shadow-sm mb-3"
            />
            <Form.Group controlId="avatarFile" className="mb-3">
              <Form.Label className="btn btn-outline-secondary btn-sm">
                Thay đổi ảnh đại diện
              </Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                hidden
              />
            </Form.Group>
          </div>

          {/* Phần nhập tên hiển thị */}
          <Form.Group className="mb-3" controlId="displayName">
            <Form.Label className="fw-bold">Tên hiển thị</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập tên mới"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer className="border-0">
          <Button variant="light" onClick={handleClose} disabled={loading}>
            Hủy
          </Button>
          <Button
            style={{ backgroundColor: "#5c4023", borderColor: "#5c4023" }}
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              "Lưu thay đổi"
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditProfileModal;
