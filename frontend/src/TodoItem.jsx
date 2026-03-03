import { useState } from 'react';
import './App.css';

function TodoItem({ todo }) {
    const [newComment, setNewComment] = useState("");

    return (
        <li>
            <div>
                <span className={todo.done ? "done" : ""}>{todo.title}</span>
                <button onClick={() => { toggleDone(todo.id) }}>Toggle</button>
                <button onClick={() => { deleteTodo(todo.id) }}>❌</button>
            </div>

            {todo.comments && todo.comments.length > 0 && (
                <ul style={{ marginTop: '5px', fontSize: '0.9em', color: '#ccc' }}>
                    {todo.comments.map(comment => (
                        <li key={comment.id}>💬 {comment.message}</li>
                    ))}
                </ul>
            )}

            <div className="new-comment-forms">
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => {
                        setNewComment(e.target.value);
                    }}
                />
                <button onClick={() => { addNewComment(todo.id) }}>Add Comment</button>
            </div>
        </li>
    );
}

export default TodoItem;