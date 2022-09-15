import React from 'react';

const Task = ({ task, onCheckBoxClick, onDeleteClick }) => {
    return (
        <li>
            <input
                type="checkbox"
                checked={!!task.isChecked}
                onClick={() => onCheckBoxClick(task)}
                readOnly
            />

            <span>{task.text}</span>
            <button onClick={() => onDeleteClick(task)}>
                &times;
            </button>
        </li>
    )
}

export default Task;