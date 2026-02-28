import { Card, Image, Stack, Modal, Button, Dropdown } from "react-bootstrap";
import { format } from "timeago.js";
import { register } from "timeago.js";
import { ThreeDots, Pencil, Trash3 } from "react-bootstrap-icons";
import { useState } from "react";
import EditPostModal from "./EditPostModal";

const viLocale = (number, index) => {
  return [
    ["vừa xong", "một lúc trước"],
    ["%s giây trước", "trong %s giây"],
    ["1 phút trước", "trong 1 phút"],
    ["%s phút trước", "trong %s phút"],
    ["1 giờ trước", "trong 1 giờ"],
    ["%s giờ trước", "trong %s giờ"],
    ["1 ngày trước", "trong 1 ngày"],
    ["%s ngày trước", "trong %s ngày"],
    ["1 tuần trước", "trong 1 tuần"],
    ["%s tuần trước", "trong %s tuần"],
    ["1 tháng trước", "trong 1 tháng"],
    ["%s tháng trước", "trong %s tháng"],
    ["1 năm trước", "trong 1 năm"],
    ["%s năm trước", "trong %s năm"],
  ][index];
};
register("vi", viLocale);

const PostCard = ({
  post,
  user,
  avatar,
  content,
  image,
  createdAt,
  isOwner,
  onDelete,
  onUpdate,
}) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const mainBrown = "#5c4023";

  const handleDeleteClick = () => {
    setShowDeleteConfirm(false);
    onDelete(post._id);
  };

  return (
    <Card className="post-card p-3 mb-3 border-0 shadow-sm position-relative">
      <Stack direction="horizontal" gap={3} className="mb-3">
        <Image
          src={post.userId?.avatar || "/images/default_avatar.jpg"}
          roundedCircle
          width={45}
          height={45}
          style={{ objectFit: "cover", border: `1px solid ${mainBrown}33` }}
        />
        <div>
          <h6 className="m-0 fw-bold" style={{ color: mainBrown }}>
            {post.userId?.displayName}
          </h6>
          {/* Sử dụng timeago để hiển thị thời gian thực từ Database */}
          <small className="text-muted">
            {createdAt ? format(createdAt, "vi") : "Vừa xong"}
          </small>
        </div>

        {/* Hiển thị nút Sửa/Xóa nếu là chủ bài viết */}
        {isOwner && (
          <Dropdown
            className="position-absolute"
            style={{ top: "15px", right: "15px" }}
          >
            <Dropdown.Toggle
              variant="link"
              id="dropdown-basic"
              className="p-0 text-decoration-none shadow-none border-0 custom-dropdown-toggle"
              style={{ color: mainBrown }}
            >
              <ThreeDots size={22} />

              {/* CSS Inline để ẩn mũi tên (caret) của Bootstrap */}
              <style type="text/css">
                {`
          .custom-dropdown-toggle::after {
            display: none;
          }
          .dropdown-item:active {
            background-color: ${mainBrown}22;
            color: inherit;
          }
        `}
              </style>
            </Dropdown.Toggle>

            <Dropdown.Menu align="end" className="border-0 shadow-sm py-2">
              <Dropdown.Item
                onClick={() => setShowEditModal(true)}
                className="d-flex align-items-center gap-2 py-2"
              >
                <Pencil size={16} className="text-primary" />
                <span style={{ color: "#444", fontSize: "0.9rem" }}>
                  Chỉnh sửa
                </span>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                onClick={() => setShowDeleteConfirm(true)}
                className="d-flex align-items-center gap-2 py-2 text-danger"
              >
                <Trash3 size={16} />
                <span style={{ fontSize: "0.9rem" }}>Xóa bài viết</span>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </Stack>

      <Card.Text className="fs-5">{content}</Card.Text>

      {post.img && post.img.trim() !== "" && (
        <div className="rounded-3 overflow-hidden border mt-2">
          <Card.Img src={post.img} variant="bottom" />
        </div>
      )}

      {post.video && post.video.trim() !== "" && (
        <div className="rounded-3 overflow-hidden border mt-2">
          <video
            src={post.video}
            controls
            className="w-100"
            style={{ maxHeight: "450px", backgroundColor: "#000" }}
          />
        </div>
      )}

      {/* --- POPUP XÁC NHẬN XÓA (Modal) --- */}
      <Modal
        show={showDeleteConfirm}
        onHide={() => setShowDeleteConfirm(false)}
        centered
        size="sm"
      >
        <Modal.Header closeButton className="border-0 pb-0"></Modal.Header>
        <Modal.Body className="text-center pt-0">
          <Trash3 size={40} color="#8b0000" className="mb-3" />
          <h5 className="fw-bold">Xóa bài viết?</h5>
          <p className="text-muted">Hành động này không thể hoàn tác.</p>
        </Modal.Body>
        <Modal.Footer className="border-0 justify-content-center pb-4">
          <Button variant="light" onClick={() => setShowDeleteConfirm(false)}>
            Hủy
          </Button>
          <Button
            style={{ backgroundColor: mainBrown, borderColor: mainBrown }}
            onClick={handleDeleteClick}
          >
            Đồng ý xóa
          </Button>
        </Modal.Footer>
      </Modal>

      <EditPostModal
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        post={post}
        onUpdate={onUpdate}
      />
    </Card>
  );
};

export default PostCard;
