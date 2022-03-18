import React from 'react';
import TaskListItem from '../TaskListItem/TaskListItem';

const TaskListDisplay = ({ taskList, removeTask, markTask }) => {
  return (
   <div className="container p-3">
      <div className="list-group list-group-flush py-5">
      {
        taskList.map((task, index) => {
          return (
            <TaskListItem key={index} task={task} removeTask={removeTask} markTask={markTask} index={index} />
          )
        })
      }
    </div>
   </div>
  )
}

export default TaskListDisplay