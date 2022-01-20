import { useDispatch } from 'react-redux';
import {
  toggleTodo, removeTodo, storeFormInput,
} from '../todosReducer';

const Task = props => {
  const dispatch = useDispatch();

  const removeButton = (
    <button
      className="remove-button"
      onClick={ () => { dispatch(removeTodo({ id: props.id })); } }
      >Remove</button>
  );

  const editButton = (
    <button
      className="edit-button"
      onClick={ () => {
        dispatch(storeFormInput({
          id: props.id,
          name: props.title,
          description: props.description,
        }));
      } }
      >Edit</button>
  );

  const toggleHandler = event => {
    if (event.target.localName !== 'button') {
      dispatch(toggleTodo({ id: props.id }));
    }
  };

  return (
    <li className={props.done ? 'tasks-card-li complete-task' : 'tasks-card-li'} onClick={toggleHandler}>
      <h3 className="task-header">{props.title}</h3>
      <p className="task-p">{props.description}</p>
      { props.done ? removeButton : editButton }
    </li>);
};

export default Task;
