import { useSelector } from 'react-redux';
import Task from './Task';

const TodoList = () => {
  const taskList = useSelector(state => state.todoArray.filter(t => {
    if (state.hideDone) {
      return !t.done;
    }
    return true;
  }));

  const tasks = taskList.map(t => (
    <Task
      key={t.id}
      id={t.id}
      title={t.name}
      done={t.done}
      description={t.description}
    />));

  return (
    <ul className="tasks-container">
      {tasks}
    </ul>
  );
};

export default TodoList;
