const Comment = ({ comment }) => {
  return (
    <div className="d-flex flex-column mb-3 border-bottom border-2">
      <p className="mb-0">{comment.text}</p>
      <small className="fw-bold">{comment.from}</small>
    </div>
  );
};

export default Comment;
