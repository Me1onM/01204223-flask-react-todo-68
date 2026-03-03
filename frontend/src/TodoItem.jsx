import { useState } from 'react';
import './App.css';

function TodoItem({ todo, toggleDone, deleteTodo, addNewComment }) {
    const [newComment, setNewComment] = useState("");

    return (
        <li style={{ marginBottom: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className={todo.done ? "done" : ""}>{todo.title}</span>
                <button onClick={() => { toggleDone(todo.id) }}>Toggle</button>
                <button onClick={() => { deleteTodo(todo.id) }} style={{ color: '#ff4d4d' }}>❌</button>
            </div>

            {(!todo.comments || todo.comments.length === 0) ? (
                // ถ้าไม่มีคอมเมนต์ ให้แสดง No comments
                <div style={{ fontSize: '0.9em', color: '#888', marginTop: '5px' }}>No comments</div>
            ) : (
                <div style={{ marginTop: '5px' }}>
                    <span style={{ fontSize: '0.9em', color: '#ccc' }}>Comments ({todo.comments.length})</span>
                    <ul style={{ listStyleType: 'circle', paddingLeft: '40px', marginTop: '5px', fontSize: '0.9em', color: '#ccc' }}>
                        {todo.comments.map(comment => (
                            comment.message.trim() !== "" && (
                                <li key={comment.id}>💬 {comment.message}</li>
                            )
                        ))}
                    </ul>
                </div>
            )}

            <div className="new-comment-forms" style={{ marginTop: '10px', display: 'flex', gap: '5px' }}>
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => {
                        setNewComment(e.target.value);
                    }}
                    placeholder="พิมพ์คอมเมนต์..."
                    style={{ padding: '5px', borderRadius: '4px', border: '1px solid #555', background: '#333', color: 'white' }}
                />
                <button onClick={() => {
                    if (newComment.trim() === "") return;
                    addNewComment(todo.id, newComment);
                    setNewComment("");
                }}>Add Comment</button>
            </div>
        </li>
    );
}

export default TodoItem;