import { Modal, Button, Form, Spinner, Image } from "react-bootstrap";
import { Image as ImageIcon, CameraVideo, XLg } from "react-bootstrap-icons";
import { useState } from "react";

const CreatePostModal = ({ show, handleClose, onAddPost }) => {
  const [content, setContent] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "guitar_preset");

    const resourceType = file.type.startsWith("video") ? "video" : "image";

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dhzj4ciy6/${resourceType}/upload`,
        { method: "POST", body: formData }
      );
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Lỗi khi tải lên:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let mediaUrl = null;
      if (selectedFile) {
        mediaUrl = await uploadFile(selectedFile);
      }

      onAddPost({
        id: Date.now(),
        user: "Cải Mè Xanh",
        content: content,
        image: selectedFile?.type.startsWith("image") ? mediaUrl : null,
        video: selectedFile?.type.startsWith("video") ? mediaUrl : null,
      });

      setContent("");
      setSelectedFile(null);
      setPreviewUrl(null);
      handleClose();
    } catch (error) {
      alert("Có lỗi xảy ra khi đăng bài!");
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
        <Modal.Title className="w-100 text-center fw-bold fs-5">
          Tạo bài viết
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="px-3">
        <div className="d-flex align-items-center mb-3">
          <Image
            src="https://i.pravatar.cc/150?u=a"
            roundedCircle
            width={45}
            className="me-2"
          />
          <div>
            <h6 className="m-0 fw-bold">Cải Mè Xanh</h6>
            <span className="badge bg-light text-dark fw-normal border">
              Công khai
            </span>
          </div>
        </div>

        <Form onSubmit={handleSubmit}>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Bạn đang nghĩ gì, Cải?"
            className="post-input-area mb-3 border-0 shadow-none fs-5"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ resize: "none" }}
          />

          {previewUrl && (
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
                  setPreviewUrl(null);
                }}
              >
                <XLg size={16} />
              </div>
              {selectedFile?.type.startsWith("image") ? (
                <Image
                  src={previewUrl}
                  className="w-100 h-auto"
                  style={{ maxHeight: "400px", objectFit: "contain" }}
                />
              ) : (
                <video
                  src={previewUrl}
                  className="w-100"
                  style={{ maxHeight: "400px" }}
                  controls
                />
              )}
            </div>
          )}

          <div className="d-flex align-items-center justify-content-between border rounded-3 p-2 mb-3 shadow-sm">
            <span className="ps-2 fw-bold small">Thêm vào bài viết</span>
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
            disabled={loading || (!content && !selectedFile)}
            className="w-100 fw-bold py-2 border-0"
            style={{ backgroundColor: "#1877f2", borderRadius: "8px" }}
          >
            {loading ? <Spinner animation="border" size="sm" /> : "Đăng"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreatePostModal;
