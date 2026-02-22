import { Card, Image, Stack } from "react-bootstrap";
import { format } from "timeago.js";
import { register } from "timeago.js";

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

const PostCard = ({ user, avatar, content, image, createdAt }) => {
  return (
    <Card className="post-card p-3 mb-3 border-0 shadow-sm">
      <Stack direction="horizontal" gap={3} className="mb-3">
        {/* Thay link mặc định bằng avatar từ props */}
        <Image
          src={avatar || "https://via.placeholder.com/150"}
          roundedCircle
          width={45}
          height={45}
          style={{ objectFit: "cover" }}
        />
        <div>
          <h6 className="m-0 fw-bold">{user}</h6>
          {/* Sử dụng timeago để hiển thị thời gian thực từ Database */}
          <small className="text-muted">
            {createdAt ? format(createdAt, "vi") : "Vừa xong"}
          </small>
        </div>
      </Stack>

      <Card.Text className="fs-5">{content}</Card.Text>

      {image && (
        <div className="rounded-3 overflow-hidden border">
          <Card.Img src={image} variant="bottom" />
        </div>
      )}
    </Card>
  );
};

export default PostCard;
