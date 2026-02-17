import { Card, Image, Stack } from "react-bootstrap";

const PostCard = ({ user, content, image }) => {
  return (
    <Card className="post-card p-3 mb-3">
      <Stack direction="horizontal" gap={3} className="mb-3">
        <Image src="https://i.pravatar.cc/150?u=1" roundedCircle width={45} />
        <div>
          <h6 className="m-0 fw-bold">{user}</h6>
          <small className="text-muted">Vừa xong</small>
        </div>
      </Stack>
      <Card.Text>{content}</Card.Text>
      {image && <Card.Img src={image} className="rounded-3" />}
    </Card>
  );
};
export default PostCard;
