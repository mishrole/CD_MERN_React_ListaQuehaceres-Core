import React from 'react';
import { confirmMessage } from './../../../util/swalMessage';

const TaskListItem = ({ task: { name, completed }, removeTask, index, markTask }) => {
  
  const remove = async () => {
    const confirm = await confirmMessage("Are you sure you want to delete this task?");
    
    if (confirm) {
      removeTask(index);
    }
  }

  const mark = () => {
    markTask(index);
  }
  
  return (
    <div className="list-group-item p-0">
      <div className="row justify-content-center">
        <label className="col-9 col-md-11 py-3">
          <input type="checkbox" className="form-check-input" name={`task-${ index }`} checked={ completed } onChange={ mark } />
          <span className={`px-2 ${completed ? 'text-decoration-line-through' : ''}`}>{ name }</span>
        </label>
        <div className="col-3 col-md-1 d-flex align-items-center justify-content-end py-3">
          <span className="badge rounded-pill bg-danger fw-bold pe-auto user-select-none" onClick={ remove }>Delete</span>
        </div>
      </div>
    </div>
  )
}

export default TaskListItem