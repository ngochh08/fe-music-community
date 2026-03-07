import {
  Card,
  Image,
  Stack,
  Modal,
  Button,
  Dropdown,
  Form,
} from "react-bootstrap";
import { format } from "timeago.js";
import { register } from "timeago.js";
import {
  ThreeDots,
  Pencil,
  Trash3,
  Chat,
  Heart,
  HeartFill,
} from "react-bootstrap-icons";
import { useState, useEffect } from "react";
import EditPostModal from "./EditPostModal";
import { Link } from "react-router-dom";
import axios from "axios";

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
  currentUser,
  content,
  createdAt,
  isOwner,
  onDelete,
  onUpdate,
  setShowAuth,
}) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const mainBrown = "#5c4023";

  const displayName = isOwner
    ? currentUser?.displayName
    : post.userId?.displayName;
  const userAvatar = isOwner ? currentUser?.avatar : post.userId?.avatar;

  const handleDeleteClick = () => {
    setShowDeleteConfirm(false);
    onDelete(post._id);
  };

  const [likes, setLikes] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(post.likes.includes(currentUser?._id));
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Lấy danh sách bình luận khi mở khung comment
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/comments/${post._id}`
        );
        setComments(res.data);
      } catch (err) {
        console.log("Lỗi lấy comment:", err);
      }
    };
    fetchComments();
  }, [post._id]);

  // Gửi bình luận mới
  const handleCommentSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!commentText.trim() || isSubmitting) return;
    setIsSubmitting(true);

    try {
      const savedToken = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:3000/api/comments",
        { postId: post._id, content: commentText },
        { headers: { token: `Bearer ${savedToken}` } }
      );
      setComments((prev) => [res.data, ...prev]);
      setCommentText("");
    } catch (err) {
      console.log("Lỗi gửi comment:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLike = async () => {
    try {
      const savedToken = localStorage.getItem("token");
      const res = await axios.put(
        `http://localhost:3000/api/posts/${post._id}/like`,
        { userId: currentUser._id },
        {
          headers: {
            token: `Bearer ${savedToken}`,
          },
        }
      );
      setIsLiked(!isLiked);
      setLikes(isLiked ? likes - 1 : likes + 1);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className="post-card p-3 mb-3 border-0 shadow-sm position-relative">
      <Stack direction="horizontal" gap={3} className="mb-3">
        <Link to={`/profile/${post.userId?._id || post.userId}`}>
          <Image
            src={userAvatar || "/images/default_avatar.jpg"}
            roundedCircle
            width={45}
            height={45}
            style={{ objectFit: "cover", border: `1px solid ${mainBrown}33` }}
          />
        </Link>
        <div>
          <Link to={`/profile/${post.userId?._id || post.userId}`}>
            <h6 className="m-0 fw-bold" style={{ color: mainBrown }}>
              {displayName}
            </h6>
          </Link>
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

      <hr className="my-3 opacity-25" />
      <Stack direction="horizontal" gap={4} className="px-2">
        {/* Nút Like */}
        <div
          className="d-flex align-items-center gap-2"
          style={{ cursor: "pointer", transition: "all 0.2s" }}
          onClick={handleLike}
        >
          {isLiked ? (
            <HeartFill size={20} color="#e63946" />
          ) : (
            <Heart size={20} color={mainBrown} />
          )}
          <span
            className="fw-bold"
            style={{ color: isLiked ? "#e63946" : mainBrown }}
          >
            {likes}
          </span>
        </div>

        {/* Nút Bình luận*/}
        <div
          className="d-flex align-items-center gap-2"
          style={{ cursor: "pointer" }}
          onClick={() => setShowComments(!showComments)} // Thêm click để ẩn/hiện
        >
          <Chat size={20} color={mainBrown} />
          <span className="fw-bold" style={{ color: mainBrown }}>
            {comments.length || 0}
          </span>
        </div>
      </Stack>

      {/* Chỉ hiển thị toàn bộ phần này khi click vào icon comment */}
      {showComments && (
        <div className="mt-3 pt-3 border-top">
          {currentUser ? (
            <Stack direction="horizontal" gap={2} className="mb-3">
              <Image
                src={currentUser?.avatar || "/images/default_avatar.jpg"}
                roundedCircle
                width={32}
                height={32}
                style={{ objectFit: "cover" }}
              />
              <Form.Control
                type="text"
                placeholder="Viết bình luận..."
                className="rounded-pill bg-light border-0 shadow-none py-2 px-3"
                style={{ fontSize: "0.85rem" }}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleCommentSubmit(e);
                }}
              />
            </Stack>
          ) : (
            /* Phần này chỉ hiện khi showComments = true */
            <div
              className="mb-3 p-2 text-center rounded-3 bg-light text-muted"
              style={{ fontSize: "0.85rem", cursor: "pointer" }}
              onClick={() => setShowAuth(true)}
            >
              Bạn cần <b style={{ color: mainBrown }}>Đăng nhập</b> để tham gia
              bình luận.
            </div>
          )}

          {/* Danh sách bình luận */}
          <div className="comments-list">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div className="d-flex gap-2 mb-2" key={comment._id}>
                  <Image
                    src={comment.userId?.avatar || "/images/default_avatar.jpg"}
                    roundedCircle
                    width={28}
                    height={28}
                    style={{ objectFit: "cover" }}
                  />
                  <div
                    className="p-2 rounded-3 bg-light"
                    style={{ fontSize: "0.85rem", maxWidth: "85%" }}
                  >
                    <b className="d-block" style={{ color: mainBrown }}>
                      {comment.userId?.displayName}
                    </b>
                    <span>{comment.content}</span>
                  </div>
                </div>
              ))
            ) : (
              <small className="text-muted d-block text-center py-2">
                Chưa có bình luận nào.
              </small>
            )}
          </div>
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
