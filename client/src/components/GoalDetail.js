import React, { useState, useEffect } from 'react';

const GoalDetail = ({ goalId }) => {
  const [goal, setGoal] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const response = await fetch(`/api/goal/${goalId}`);
        const data = await response.json();
        setGoal(data);
      } catch (error) {
        console.error('Error fetching goal:', error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/comments?goalId=${goalId}`);
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchGoal();
    fetchComments();
  }, [goalId]);

  const handleAddComment = async () => {
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ goalId, text: newComment }),
      });
      const data = await response.json();
      setComments((prevComments) => [...prevComments, data]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  if (!goal) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{goal.title}</h1>
      <p>{goal.details}</p>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            {comment.username}: {comment.text}
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="New comment"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button onClick={handleAddComment}>Post Comment</button>
    </div>
  );
};

export default GoalDetail;
