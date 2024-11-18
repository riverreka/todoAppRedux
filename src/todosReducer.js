import { createSlice } from '@reduxjs/toolkit';

const storage = window.localStorage;
const initialFormInput = {
  name: '',
  description: '',
  id: null,
};

const getDefaultState = () => {
  const savedTodos = storage.getItem('store');
  if (savedTodos) {
    return {
      ...JSON.parse(savedTodos),
      formInput: initialFormInput,
    };
  }
  return {
    hideDone: false,
    todoArray: [],
    formInput: initialFormInput,
  };
};

const saveCurrentState = state => {
  // create new object without the formInput property
  const { formInput, ...saveObj } = state;
  storage.setItem('store', JSON.stringify(saveObj));
};

const sortTodos = (todo1, todo2) => {
  if (todo1.done === todo2.done) {
    return (todo1.id - todo2.id);
  }
  return todo1.done ? 1 : -1;
};

const getIndexOf = (state, id) => state.todoArray.findIndex(todo => todo.id === id);

/* eslint-disable no-param-reassign */
const todoSlice = createSlice({
  name: 'todos',
  initialState: getDefaultState(),
  reducers: {
    addTodo(state) {
      state.todoArray.push({
        id: new Date().getTime(),
        name: state.formInput.name,
        description: state.formInput.description,
        done: false,
      });
      state.todoArray.sort(sortTodos);
      state.formInput = initialFormInput;
      saveCurrentState(state);
    },
    editTodo(state) {
      const index = getIndexOf(state, state.formInput.id);
      state.todoArray[index] = {
        ...state.todoArray[index],
        name: state.formInput.name,
        description: state.formInput.description,
      };
      state.formInput = initialFormInput;
      saveCurrentState(state);
    },
    toggleTodo(state, action) {
      const index = getIndexOf(state, action.payload.id);
      state.todoArray[index].done = !state.todoArray[index].done;
      state.todoArray.sort(sortTodos);
      saveCurrentState(state);
    },
    removeTodo(state, action) {
      console.log("action", action.payload.id);
      state.todoArray.splice(getIndexOf(state, action.payload.id), 1);
      saveCurrentState(state);
    },
    toggleHide(state) {
      state.hideDone = !state.hideDone;
      saveCurrentState(state);
    },
    storeFormInput(state, action) {
      state.formInput = action.payload;
    },
  },
});

export const {
  addTodo, editTodo, toggleTodo, removeTodo, toggleHide, storeFormInput,
} = todoSlice.actions;
export default todoSlice.reducer;
