import { useDispatch, useSelector } from 'react-redux';
import {
  addTodo, editTodo, toggleHide, storeFormInput,
} from '../todosReducer';

const Form = () => {
  const input = useSelector(state => state.formInput);
  const isChecked = useSelector(state => state.hideDone);
  const dispatch = useDispatch();

  const storeInput = e => {
    const { name, value } = e.target;
    dispatch(storeFormInput({
      ...input,
      [name]: value,
    }));
  };

  const submit = e => {
    e.preventDefault();
    if (input.name !== '') {
      if (input.id) {
        dispatch(editTodo());
      } else {
        dispatch(addTodo());
      }
    }
  };

  const handleCheckbox = () => dispatch(toggleHide());

  return (
    <form className="register-form">
      <p className="register-form__p">New Task</p>
      <label className="register-form__label" htmlFor="register-form__newtask">Title*</label>
      <input
        placeholder='Add new task here...'
        type="text"
        name="name"
        value={input.name}
        className="register-form__newtask"
        onChange={storeInput}/>
      <label className="register-form__label" htmlFor="register-form__description">Details</label>
      <input
        placeholder='Details come here...'
        type="text"
        name="description"
        value={input.description}
        className="register-form__description"
        onChange={storeInput}/>
      <button className="register-form--add-button" onClick={submit} onKeyDown={submit}>Add</button>
      <p className="register-form--hide-done">
        <input
          type="checkbox"
          onChange={handleCheckbox}
          id="hide-done"
          checked={isChecked} />
        <label htmlFor="hide-done">Hide completed tasks</label>
      </p>
      <p className="register-form--footnote">* mandatory</p>
    </form>
  );
};

export default Form;
