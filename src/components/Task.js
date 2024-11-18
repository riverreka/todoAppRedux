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

  console.log(props.id);

  return (
    <li key={props.id} className={props.done ? 'tasks-card-li complete-task' : 'tasks-card-li'} onClick={toggleHandler}>
      <div className='tasks-card-li-left'>
        <h3 className="task-header">{props.title}</h3>
        <p className="task-p">{props.description}</p>
      </div>
      <div className='tasks-card-li-right'>{ props.done ? removeButton : editButton }</div>
    </li>);
};

export default Task;
