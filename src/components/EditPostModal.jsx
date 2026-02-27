import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Spinner, Image } from "react-bootstrap";
import { Image as ImageIcon, CameraVideo, XLg } from "react-bootstrap-icons";
import axios from "axios";

const EditPostModal = ({ show, handleClose, post, onUpdate }) => {
  const [content, setContent] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState("");
  const [fileType, setFileType] = useState("");

  const mainBrown = "#5c4023";

  useEffect(() => {
    if (post) {
      setContent(post.desc || "");
      setPreview(post.img || post.video || "");
      setFileType(post.video ? "video" : "image"); // Xác định loại file ban đầu
    }
  }, [post, show]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setFileType(file.type.startsWith("video") ? "video" : "image"); // Cập nhật loại file mới
    }
  };

  const uploadFile = async (file) => {
    const data = new FormData();
    data.append("file", file);
    // Sử dụng preset guitar_preset giống CreatePostModal cho đồng bộ
    data.append("upload_preset", "guitar_preset");

    // Xử lý loại resource động: image hoặc video
    const resourceType = file.type.startsWith("video") ? "video" : "image";

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/dhzj4ciy6/${resourceType}/upload`,
        data
      );
      return res.data.secure_url;
    } catch (err) {
      console.error("Lỗi khi tải lên:", err);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      // Nếu không có preview (đã bấm X) thì xóa trắng, ngược lại giữ giá trị cũ
      let mediaUrl = preview ? post.img || post.video : "";

      // Nếu người dùng chọn file mới, thực hiện upload
      if (selectedFile) {
        mediaUrl = await uploadFile(selectedFile);
      }

      const response = await axios.put(
        `http://localhost:3000/api/posts/${post._id}`,
        {
          desc: content,
          img: fileType === "image" ? mediaUrl : "", // Nếu là video thì xóa ảnh cũ
          video: fileType === "video" ? mediaUrl : "", // Nếu là ảnh thì xóa video cũ
        },
        { headers: { token: `Bearer ${token}` } }
      );

      onUpdate(response.data);
      handleClose();
    } catch (error) {
      alert("Lỗi khi cập nhật!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      size="md"
      className="custom-modal"
    >
      <Modal.Header closeButton className="border-bottom-0 pb-0">
        <Modal.Title
          className="w-100 text-center fw-bold fs-5"
          style={{ color: mainBrown }}
        >
          Chỉnh sửa bài viết
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="px-3">
        <div className="d-flex align-items-center mb-3">
          <Image
            src={post?.userId?.avatar || "https://i.pravatar.cc/150?u=a"}
            roundedCircle
            width={45}
            height={45}
            className="me-2"
            style={{ objectFit: "cover" }}
          />
          <div>
            <h6 className="m-0 fw-bold">
              {post?.userId?.displayName || "Cải Mè Xanh"}
            </h6>
            <span className="badge bg-light text-dark fw-normal border">
              Công khai
            </span>
          </div>
        </div>

        <Form onSubmit={handleSubmit}>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Bạn đang muốn sửa gì?"
            className="post-input-area mb-3 border-0 shadow-none fs-5"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ resize: "none" }}
          />

          {/* Preview hình ảnh hiện tại hoặc hình ảnh mới chọn */}
          {preview && (
            <div className="media-preview-container mb-3 position-relative bg-light rounded-3 overflow-hidden border">
              <div
                className="position-absolute top-0 end-0 m-2 bg-white rounded-circle p-1 shadow-sm border"
                style={{
                  cursor: "pointer",
                  zIndex: 5,
                  width: "30px",
                  height: "30px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={() => {
                  setSelectedFile(null);
                  setPreview(null);
                }}
              >
                <XLg size={16} />
              </div>
              {fileType === "image" ? (
                <Image
                  src={preview}
                  className="w-100 h-auto"
                  style={{ maxHeight: "400px", objectFit: "contain" }}
                />
              ) : (
                <video
                  src={preview}
                  className="w-100"
                  style={{ maxHeight: "400px" }}
                  controls
                />
              )}
            </div>
          )}

          <div className="d-flex align-items-center justify-content-between border rounded-3 p-2 mb-3 shadow-sm">
            <span className="ps-2 fw-bold small">Cập nhật hình ảnh</span>
            <div className="d-flex">
              <label
                className="m-0 p-2 rounded-circle hover-bg"
                style={{ cursor: "pointer" }}
              >
                <ImageIcon color="#45bd62" size={24} />
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleFileChange}
                />
              </label>
              <label
                className="m-0 p-2 rounded-circle hover-bg"
                style={{ cursor: "pointer" }}
              >
                <CameraVideo color="#f02849" size={24} />
                <input
                  type="file"
                  accept="video/*"
                  hidden
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading || (!content && !preview)}
            className="w-100 fw-bold py-2 border-0"
            style={{ backgroundColor: mainBrown, borderRadius: "8px" }}
          >
            {loading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              "Lưu thay đổi"
            )}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditPostModal;
