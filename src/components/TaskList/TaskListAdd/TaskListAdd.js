import React, { useReducer } from 'react';
import { errorMessage } from './../../../util/swalMessage';

const reducer = (state, action) => {

  if (action.type === 'reset') {
    return initialState;
  }

  return {
    ...state,
    [action.type]: action.payload
  };
}

const initialState = {
  task: {
    value: '',
    error: null
  }
}

const TaskListAdd = ({ onNewTask }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;

    let isValid = false;

    if (value.trim().length > 0) {
      isValid = true;
    }

    dispatch({
      type: name,
      payload: {
        value: value,
        error: {
          result: isValid ? 'is-valid' : 'is-invalid',
          message: isValid ? 'Looks good!' : `Please provide a valid ${name}`
        }
      }
    });
  }

  const clearForm = () => {
    dispatch({ type: 'reset'});
  }

  const formIsValid = (e) => {
    const inputs = Array.from(e.target.children)
    .map(item => Array.from(item.children)
    .filter(item => item.localName === 'input'))
    .filter(item => item.length > 0)
    .flat();

    const emptyInputs = inputs.filter(item => item.value.length === 0);
    const invalidInputs = inputs.filter(item => item.classList.contains('is-invalid'));

    if (emptyInputs.length > 0 || invalidInputs.length > 0) {
      return false;
    }

    return true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formIsValid(e)) {
      onNewTask({
        value: state.task.value
      })

      clearForm();
    } else {
      errorMessage("Task cannot be empty");
    }
  }

  return (
    <div className="container">
      <form className="row" onSubmit={ handleSubmit }>
        <div className="col-9 col-md-10">
          <input type="text" value={ state.task.value } onChange={ handleChange } name="task" className={`form-control ${ state.task.error?.result }`} />
          {
            state.task.error !== null && (<p className={`${ state.task.error?.result === 'is-valid' ? 'valid-feedback' : 'invalid-feedback' }`}> {state.task.error?.message }</p>)
          }
        </div>
        <div className="col-3 col-md-2 d-flex justify-content-end">
          <div>
          <button className="btn btn-primary" type="submit">Add <span className="d-none d-md-inline">Task</span></button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default TaskListAdd