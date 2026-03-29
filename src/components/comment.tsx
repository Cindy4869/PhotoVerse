import React, { useState, useEffect } from "react";

type Comment = {
  comment_id: number;
  post_id: number;
  author_id: number;
  content: string;
  creation_time: string;
};

type Props = {
  postId: number; // Pass the post ID to fetch comments
  userId: number; // Current logged-in user ID
};

const CommentSection: React.FC<Props> = ({ postId, userId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/posts/${postId}/comments`);
        if (response.ok) {
          const data = await response.json();
          setComments(data);
        } else {
          console.error("Failed to fetch comments");
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [postId]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      const response = await fetch(`http://localhost:4000/api/posts/${postId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ author_id: userId, content: newComment }),
      });

      if (response.ok) {
        const addedComment = await response.json();
        setComments([...comments, addedComment]);
        setNewComment("");
      } else {
        console.error("Failed to add comment");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="comment-section">
      <h3>Comments</h3>
      <div className="comment-list">
        {comments.map((comment) => (
          <div key={comment.comment_id} className="comment">
            <p><strong>Author {comment.author_id}:</strong> {comment.content}</p>
            <p><small>{new Date(comment.creation_time).toLocaleString()}</small></p>
          </div>
        ))}
      </div>
      <div className="comment-input">
        <textarea
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleAddComment}>Post Comment</button>
      </div>
    </div>
  );
};

export default CommentSection;