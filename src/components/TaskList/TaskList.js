import React, { useEffect, useReducer } from 'react';
import TaskListAdd from './TaskListAdd/TaskListAdd';
import TaskListDisplay from './TaskListDisplay/TaskListDisplay';

const getLSTaskList = () => {
  return localStorage.getItem("tasks") == null ? [] : JSON.parse(localStorage.getItem("tasks"));
}

const initialState = getLSTaskList();

const reducer = (state, action) => {
  if (action.type === 'reset') {
    return initialState;
  }

  if (action.type === 'overwrite') {
    return [
      ...action.payload
    ]
  }

  return [
    action.payload,
    ...state
  ];
}

const TaskList = () => {
  
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(state));
    getLSTaskList();
  }, [state])

  const handleTaskCreated = ({ value }) => {
    dispatch({
      type: 'task',
      payload: {
        name: value,
        completed: false
      }
    });
  }

  const newTaskCreated = ( newTask ) => {
    handleTaskCreated(newTask);
  }

  const removeTask = ( index ) => {
    const newTaskList = [...state];
    newTaskList.splice(index, 1);

    dispatch({
      type: 'overwrite',
      payload: newTaskList
    });
  }

  const markTask = ( index ) => {
    const newTaskList = [...state];
    newTaskList[index].completed = !newTaskList[index].completed;

    dispatch({
      type: 'overwrite',
      payload: newTaskList
    });
  }

  return (
    <div className="container p-3 mx-auto">
      <TaskListAdd onNewTask={ newTaskCreated } />
      {
        state.length === 0 ? <p className="text-center pt-5">There's no tasks yet 😿</p> : <TaskListDisplay removeTask={ removeTask } taskList={ state } markTask={ markTask }/>
      }
    </div>
  )
}

export default TaskList